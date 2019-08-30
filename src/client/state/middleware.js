import { addToLoading, removeFromLoading } from './actions';

const isPending = (type) => type.endsWith("_PENDING");
const isFailed = (type) => type.endsWith("_REJECTED");
const isCompleted = (type) => type.endsWith("_FULFILLED");
const getBaseType = (type) => {
    if (isPending(type) || isCompleted(type) || isFailed(type)) {
        return type.substring(0, type.lastIndexOf("_"));
    }

    return type;
};

export default function middleware() {
    return (store) => (next) => (action) => {

        // Loading specific listeners
        if (isPending(action.type)) {
            store.dispatch(addToLoading(getBaseType(action.type)));
        }

        if (isCompleted(action.type) || isFailed(action.type)) {
            store.dispatch(removeFromLoading(getBaseType(action.type)));
        }

        return next(action);
    };
}
