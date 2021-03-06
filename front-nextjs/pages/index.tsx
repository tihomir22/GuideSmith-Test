import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { Phone } from "../models/Phone.model";
import { Button, Card, Skeleton } from "antd";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { Footer } from "antd/lib/layout/layout";
import CreatePhoneModal from "../components/create-phone-modal";
const { Meta } = Card;

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCreation, setDisplayCreation] = useState(false);

  function fetchPhones() {
    setLoading(true);
    axios
      .get("http://localhost:3000/phones")
      .then((phones) => setPhones(phones.data as Array<Phone>))
      .finally(() => setLoading(false));
  }

  async function createPhone(newPhone: Phone) {
    await axios.post("http://localhost:3000/phones", newPhone);
    fetchPhones();
  }

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <div className={styles.main}>
      <Head>
        <title>Guidesmith Phone App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.containerCards}>
          <Skeleton loading={loading}>
            {phones.map((phone: Phone, index) => {
              return (
                <Link href={phone.id} key={index}>
                  <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={phone.imageUrl} />}>
                    <Meta title={phone.name} description={phone.manufacturer} />
                  </Card>
                </Link>
              );
            })}
            {(!phones || phones.length == 0) && <div>No phones :(</div>}
          </Skeleton>
        </div>
        <CreatePhoneModal
          close={setDisplayCreation}
          onSubmitForm={(newPhone) => createPhone(newPhone)}
          display={displayCreation}
        ></CreatePhoneModal>
      </main>
      <div className="floating-action">
        <Button type="primary" onClick={() => setDisplayCreation(true)}>
          Create Phone
        </Button>
      </div>
    </div>
  );
}
