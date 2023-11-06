
import dynamic from "next/dynamic";

const DeviceDataTable = dynamic(() => import("../../components/DeviceDataTable"), { ssr: false })

const Devices = () => {
    return (
        <div>
            <DeviceDataTable />
        </div>
    );
}

export default Devices;