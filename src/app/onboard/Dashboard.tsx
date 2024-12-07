import { useState } from "react";
import CertificatePreview from "@/components/CertificatePreview";
import { Form, Input, Button } from "@/components/ui";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    name: "",
    title: "",
    institution: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Datos enviados:", userData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <Form>
          <Input
            label="Nombre"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <Input
            label="Título"
            name="title"
            value={userData.title}
            onChange={handleChange}
          />
          <Input
            label="Institución"
            name="institution"
            value={userData.institution}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Registrar</Button>
        </Form>
      </div>

      <CertificatePreview
        name={userData.name}
        title={userData.title}
        institution={userData.institution}
      />
    </div>
  );
}
