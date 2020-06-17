import * as React from "react";
import KifuStore from "./stores/KifuStore";
import "../css/kifuforjs.css";
export interface IProps {
    filePath?: string;
    kifu?: string;
    isOver?: boolean;
    kifuStore?: KifuStore;
    connectDropTarget?: (element: any) => any;
}
export declare class Kifu extends React.Component<IProps, {}> {
    kifuStore: KifuStore;
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    render(): any;
}
