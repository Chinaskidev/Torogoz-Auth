import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <Link href={"/"}>
            <Image 
                src="/torogoz3logo.png" 
                alt="Torogoz Logo" 
                width={150} // Ajusta según el tamaño real
                height={50} // Ajusta según el tamaño real
                className="ml-3 mr-2"
            />
        </Link>
    );
};

export default Logo;
