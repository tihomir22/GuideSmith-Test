import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Detail.module.scss";
import { Button, Divider, List, Skeleton, Typography } from "antd";
import { Phone } from "../models/Phone.model";
import Image from "next/image";
import Link from "next/link";
import CreatePhoneModal from "../components/create-phone-modal";

export default function Detail() {
  const [activeId, setActiveId] = useState([]);
  const [activePhone, setActivePhone] = useState({} as Phone);

  const [loading, setLoading] = useState(true);
  const { query, push } = useRouter();

  function fetchPhones() {
    setLoading(true);
    axios
      .get("http://localhost:3000/phones/" + query.id)
      .then((phone) => setActivePhone(phone.data))
      .finally(() => setLoading(false));
  }

  function deletePhone() {
    axios.delete("http://localhost:3000/phones/" + query.id).then((phone) => push("/"));
  }

  useEffect(() => {
    if (query.id) {
      fetchPhones();
    }
  }, [query]);
  return (
    <>
      <Skeleton loading={loading}>
        <div className={styles.container}>
          <img src={activePhone.imageUrl} className={styles.image} alt="" />
          <div className={styles.details}>
            <List
              header={<strong>Details</strong>}
              footer={
                <div className="actions">
                  <Link href={"/"}>
                    <Button type="primary">Go back</Button>
                  </Link>
                  <Button type="default" onClick={deletePhone}>
                    Delete
                  </Button>
                </div>
              }
              dataSource={[activePhone]}
              renderItem={(phone) => {
                return (
                  <div>
                    {Object.keys(phone)
                      .filter((key) => key != "id" && key != "detailImages" && key != "imageUrl")
                      .map((filteredPhoneKey, index) => {
                        return (
                          <List.Item className={styles.phoneItem} key={index}>
                            {phone[filteredPhoneKey] + "" + (filteredPhoneKey == "price" ? "$" : "")}
                          </List.Item>
                        );
                      })}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </Skeleton>
    </>
  );
}
