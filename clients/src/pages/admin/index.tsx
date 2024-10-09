import { AdminLayout } from "@/layouts";
import { NextPageWithLayout } from "@/models";

const Dashboard:NextPageWithLayout = function(){
    return <>Dashboard</>
}

Dashboard.layout = AdminLayout;
export default Dashboard;