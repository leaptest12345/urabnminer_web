import React, { useState } from "react";
import Button from "../components/Button";
import ImageModal from "../components/ImageModal";
import Input from "../components/Input";
import PhotoCapture from "../components/PhotoCapture";
import SearchAutoComplete from "../components/SearchAutoComplete";
import { CustomerBox, CustomerPhotoView } from "../styles/Customer.styles";
import { Row, Text, Title, View_6, Wrapper } from "../utils/GlobalStyles";

export default function Customer() {
  const [photo, setPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  return (
    <Wrapper>
      <Title>Create Invoice</Title>
      <View_6>
        <SearchAutoComplete />
      </View_6>
      <CustomerBox>
        <Input label="FirstName" />
        <Input label="LastName" />
        <Input label="Business Name" />
        <Input label="Business Address" />
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              handleChange={(e) =>
                setPhoto(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              handleChange={(e) =>
                setPhoto1(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo1} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              handleChange={(e) =>
                setPhoto2(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo2} />
          </Row>
        </CustomerPhotoView>
      </CustomerBox>
      <Button title="Start Invoice" to="/invoice" />
    </Wrapper>
  );
}
