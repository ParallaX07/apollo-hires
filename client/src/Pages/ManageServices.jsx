import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import ServiceLoadingSkeleton from "../components/FunctionalComponents/ServiceLoadingSkeleton";
import Servicecards from "../components/Servicecards";
import { MessageContext } from "./Root";
import Swal from "sweetalert2";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ManageServices = () => {

    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const {notifySuccess} = useContext(MessageContext);

    useDocumentTitle("Manage Services | Apollo Hires");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        axiosSecure.get(`/services/user/${user?.email}`).then((res) => {
            setServices(res.data);
        }).finally(() => setIsLoading(false));
    }, []);


    const handleDelete = (id) => {
        Swal.fire({
            title: `Do you want to delete the item?`,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it",
            denyButtonText: `No, don't delete`,
            icon: "question",
            confirmButtonColor: '#0b090a', 
            background: '#0b090a',
            denyButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                axiosSecure.delete(`/services/${id}`).then(() => {
                    const newServices = services.filter(
                        (service) => service._id !== id
                    );
                    setServices(newServices);
                    notifySuccess("Service deleted successfully");
                }).finally(() => setIsLoading(false));
            }
        });       
    }

    return (
        <section className="bg-white dark:bg-primary w-full lg:max-w-4xl mx-auto py-28 transition duration-300">
            <div className="grid grid-cols-1 gap-8 p-4">
                {isLoading ? (
                    <>
                        <ServiceLoadingSkeleton />
                        <ServiceLoadingSkeleton />
                        <ServiceLoadingSkeleton />
                    </>
                ) : null}
                {services.map((service) => (
                    <Servicecards key={service._id} service={service} email={user?.email} handleDelete={handleDelete}/>
                ))}
            </div>
            
        </section>
    );
};

export default ManageServices;