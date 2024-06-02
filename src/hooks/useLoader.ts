import {ILoaderContext, LoaderContext} from "../providers";
import {useContext} from "react";

export const useLoader = (): ILoaderContext => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader должен использоваться внутри LoaderProvider');
    }
    return context;
}
