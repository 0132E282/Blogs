import AdminSidebar from "@/components/sidebar/admin-sidebar";
import { PropsLayouts } from "@/models";

export type PropsAdminLayout = PropsLayouts;
const styles = {
    main : 'flex max-w-[100vw] min-h-[100vh]  bg-[#f5f5f5]  justify-between ',
    content: 'flex-1 px-4 py-5',
    container : "flex-1 flex h-full",
    aside: 'max-w-sidebar max-w-[250px] w-full justify-between min-h-[100vh] bg-[#fff]',
}

const AdminLayout:React.FC<PropsAdminLayout> = function ({children}){
    return <main className={styles.main }>
        <aside className={styles.aside}>
              <AdminSidebar/>
         </aside>
        <section className={styles.content}>{children}</section>
    </main>
}

export default AdminLayout;