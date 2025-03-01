// const useStore = create((set) => ({
//     filter: "all",
//     todos: [],
//     setFilter(filter) {
//       set({ filter });
//     },
//     setTodos(fn) {
//       set((prev) => ({ todos: fn(prev.todos) }));
//     },
//   }));
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'
import { SetState, StoreApi, Subscribe } from './types';

const useStore = <State, StateSlice>(api: StoreApi<State>, selector: (state: State) => StateSlice = api.getState as any, equalityFn: (a: StateSlice, b: StateSlice) => boolean) => {
    const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getState, selector, equalityFn)
    return slice
}

const createStore = <T>(createState) => {
    let state: T;
    const listeners = new Set<ReturnType<Subscribe>>();
    const getState = () => state;
    // partial 部分的，不完全的
    const setState: SetState<T> = (partial) => {
        // set({ filter });
        // set((prev) => ({ todos: fn(prev.todos) }));
        const nextState = typeof partial === 'function' ? partial(state) : partial
        if (!Object.is(state, nextState)) {
            // set((state) => ({ ...state, count: 10 }) 允许只传递更改的部分，不需要...state
            state =
      typeof nextState !== "object" || nextState === null
        ? (nextState as T)
        : Object.assign({}, state, nextState);
            listeners.forEach((listener) => listener())
        }
    }
    const subscribe: Subscribe = (listener) => {
        // react 给出监听器，当数据改变时需要调用所有监听器函数通知react更新
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }
    const api = {getState, setState, subscribe}
        //      {
        //     filter: "all",
        //     todos: [],
        //     setFilter(filter) {
        //       set({ filter });
        //     },
        //     setTodos(fn) {
        //       set((prev) => ({ todos: fn(prev.todos) }));
        //     },
        //   }
    state = createState(setState) // 返回一个对象，有函数有数据
    
    return api
}

/**
 * create 接收一个函数并创建 store，返回一个 hook 用来获取内部属性
 */
export const create = (createState) => {
    // createState
        // (set) => ({
        //     filter: "all",
        //     todos: [],
        //     setFilter(filter) {
        //       set({ filter });
        //     },
        //     setTodos(fn) {
        //       set((prev) => ({ todos: fn(prev.todos) }));
        //     },
        //   })
    const api = createStore(createState)
    // 去掉这块逻辑就是vanilla 版本
    const useBoundStore = (selector, equalityFn) =>
        useStore(api, selector, equalityFn);
      return useBoundStore;
}