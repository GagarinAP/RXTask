import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

const INITIAL_STATE = {
  items: {},
  favorite: {},
  sort: '',
  el: '',
  search: ''
};

export const setItems = createAction('TABLE/SET_ITEMS', items => ({ items }));
export const clear = createAction('TABLE/CLEAR');
export const setFavorites = createAction('TABLE/SET_FAVORITE', favorite => ({ favorite }));
export const unSetFavorites = createAction('TABLE/UNSET_FAVORITE', index => ({ index }));
export const setSearch = createAction('TABLE/SET_SEARCH', search => ({ search }));
export const elementSort = createAction('TABLE/SET_EL_SORT', (el, sort) => ({ el, sort }));

const sortTable = state => state.table.sort;
const itemsTable = state => Object.keys(state.table.items).map(el => state.table.items[el]);
const favoritesArr = state => Object.keys(state.table.favorite).map(el => state.table.favorite[el]);
const el = state => state.table.el;
const searchEl = state => state.table.search;

const searchRegExFn = (search, items) => {
  let reg = "(" + search + ")(?![^<]*>|[^<>]*</)";
  let regex = new RegExp(reg, "gi");
  return items.filter(i => {
    if (i.id.toString().match(regex)) {
      i.id = i.id.toString().replace(regex, `<b>${search}</b>`);
      return true;
    }
    if (i.address.match(regex)) {
      i.address = i.address.replace(regex, `<b>${search}</b>`);
      return true;
    }
    if (i.type.match(regex)) {
      i.type = i.type.replace(regex, `<b>${search}</b>`);
      return true;
    }
    return false;
  });
};

const sortByIndex = (sort, items, el) => {
  switch(sort) {
    case 'ASC':
      return items.sort((a,b) => a[el] - b[el]);
    case 'DESC':
      return items.sort((a,b) => b[el] - a[el]);
    default:
      return items;
  }
};

const sortByText = (sort, items, el) => {
  switch(sort) {
    case 'ASC':
      return items.sort((a,b) => {
        const pre = a[el].toUpperCase();
        const next = b[el].toUpperCase();
        if (pre < next) {
          return -1;
        }
        if (pre > next) {
          return 1;
        }
        return 0;
      });
    case 'DESC':
      return items.sort((a,b) => {
        const pre = b[el].toUpperCase();
        const next = a[el].toUpperCase();
        if (pre < next) {
          return -1;
        }
        if (pre > next) {
          return 1;
        }
        return 0;
      });
    default:
      return items;
  }
};

export const itemsSelector = createSelector(
  [sortTable, itemsTable, el, searchEl, favoritesArr],
  (sort, arr, el, search, favorite) => {
    let items = arr.filter(e => favorite.filter(o => o.id === e.id).length === 0) || [];
    if (search.length) {
      items = searchRegExFn(search, items);
    }
    switch(el) {
      case 'id':
      case 'price':
      case 'lastUpdate':
        return sortByIndex(sort, items, el);
      case 'address':
      case 'type':
        return sortByText(sort, items, el);
      default:
        return items;
    }
  }
);

export const favoriteSelector = createSelector(
  [sortTable, favoritesArr, el, searchEl],
  (sort, favorite, el, search) => {
    let items = favorite || [];
    if (search.length) {
      items = searchRegExFn(search, items);
    }
    switch(el) {
      case 'id':
      case 'price':
      case 'lastUpdate':
        return sortByIndex(sort, items, el);
      case 'address':
      case 'type':
        return sortByText(sort, items, el);
      default:
        return items;
    }
  }
);

export default handleActions(
  {
    [clear]: state => update(state, { sort: { $set: '' }, el: { $set: '' }, search: { $set: '' } }),
    [setItems]: (state, action) => update(state, { items: { $merge: action.payload.items } }),
    [setFavorites]: (state, action) => {
      return update(state, { favorite: { $merge: { [action.payload.favorite.id]: action.payload.favorite }}});
    },
    [unSetFavorites]: (state, action) => {
      delete state.favorite[action.payload.index.id];
      return update(state, { favorite: { $set: state.favorite } });
    },
    [elementSort]: (state, action) => {
      return update(state, { el: { $set: action.payload.el }, sort: { $set: action.payload.sort } });
    },
    [setSearch]: (state, action) => update(state, { search: { $set: action.payload.search } })
  },
  INITIAL_STATE
);
