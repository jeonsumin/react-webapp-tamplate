import {Header, NavigationBar} from "components";
import {Layout} from 'shared/ui'

export const BaseLayout = () => {

    return (
        <Layout
            headerSlot={<Header/>}
            navigationSlot={<NavigationBar/>}
        />
    )
}

