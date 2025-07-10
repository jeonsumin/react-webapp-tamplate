import {Header, NavigationBar} from "components";
import {Layout} from 'shared/ui'

type Props = {
    isDetail?: boolean;
}

export const BaseLayout = (props: Props) => {
    return (
        <Layout
            headerSlot={<Header {...props}/>}
            navigationSlot={<NavigationBar/>}
        />
    )
}

