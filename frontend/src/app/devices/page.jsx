
import dynamic from "next/dynamic";

const DeviceDataDisplay = dynamic(() => import("../../components/DeviceDataDisplay"), { ssr: false })

const Devices = () => {
    return (
        <div>
            <DeviceDataDisplay />
        </div>
    );
}

export default Devices;