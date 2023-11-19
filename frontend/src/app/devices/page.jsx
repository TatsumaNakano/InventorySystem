
import dynamic from "next/dynamic";
import DeviceToolbar from "@/components/DeviceToolbar"

const DeviceDataDisplay = dynamic(() => import("../../components/DeviceDataDisplay"), { ssr: false })

const Devices = () => {
    return (
        <div>
            <DeviceToolbar />
            <DeviceDataDisplay />
        </div>
    );
}

export default Devices;