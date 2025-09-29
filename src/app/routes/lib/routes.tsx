import {ElementType, ReactNode} from "react";
import {Dashboard} from "pages/dashboard";

export type NavItem = {
    title: string;
    key: string;
    icon?: ElementType;
    element: ReactNode
    keys?: string[];
    titles?: string[];
    children?: NavItem[];
}

type RouteType = {
    path: string;
    redirect?: string;
    element?: string;
}

export const routeSetting: NavItem[] = [
    {
        key: "dashboard",
        title: "정기 모니터링",
        element: <Dashboard />,
        children: [
            {
                key: "",
                title: "프로젝트 리포트",
                element: <></>
            },
            {
                key: "",
                title: "프로젝트 생성",
                element: <></>
            }
        ]
    },
]

const treeList = (tree: NavItem[]) => {
    const menuMap = new Map<string, string[]>();
    const routes: RouteType[] = [];

    function travers(node: NavItem, keys: string[] = [], titles: string[] = []) {
        node.keys = [...keys, node.key];
        node.titles = [...titles, node.title];

        const fullpath: string = `/${node.keys.join('/')}`;
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => travers(child, node.keys ?? [], node.titles ?? []));
            routes.push({
                path: fullpath,
                redirect: fullpath + "/" + node.children[0].key
            })
        } else {
            menuMap.set(fullpath, [...node.titles]);
            routes.push({
                path: fullpath,
                element: fullpath
            })
        }
    }

    tree.forEach(node => travers(node));

    return {menuMap, routes};
}

export const {menuMap, routes} = treeList(routeSetting);
