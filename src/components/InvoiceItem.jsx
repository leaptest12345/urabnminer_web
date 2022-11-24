import { Delete } from "@mui/icons-material";
import React, { useState } from "react";
import { StyledInput } from "../styles/Input.styles";
import {
  InvoiceImage,
  InvoiceItemView,
  RowView,
} from "../styles/Invoice.styles";
import { Bold_1, Row, View_6 } from "../utils/GlobalStyles";
import ImageModal from "./ImageModal";
import PhotoCapture from "./PhotoCapture";
import SearchAutoComplete from "./SearchAutoComplete";

export default function InvoiceItem({
  ItemName,
  onItemChange,
  Unit,
  Total,
  GrossWeight,
  NetWeight,
  TareWeight,
  WeightPrice,
  UnitPrice,
  onUnitChange,
  onUnitPriceChange,
  onGrossChange,
  onTareChange,
  onWeightPriceChange,
  onNetWeightChange,
  onImagePic,
  IMG,
}) {
  const [WeightType, setWeightType] = useState(0);
  return (
    <>
      <InvoiceItemView>
        <RowView>
          <Bold_1>1)</Bold_1>
          <PhotoCapture title="Add Photo" handleChange={onImagePic} />
        </RowView>
        <RowView>
          <Bold_1>ItemName :</Bold_1>
          <View_6>
            <SearchAutoComplete
              onChange={onItemChange}
              defaultValue={ItemName}
            />
          </View_6>
        </RowView>
        {WeightType ? (
          <>
            <RowView>
              <Bold_1>Unit :</Bold_1>
              <StyledInput width="60%" value={Unit} onChange={onUnitChange} />
            </RowView>
            <RowView>
              <Bold_1>Price :</Bold_1>
              <StyledInput
                width="60%"
                value={UnitPrice}
                onChange={onUnitPriceChange}
                style={{
                  fontWeight: "600",
                }}
              />
            </RowView>
            <RowView>
              <Bold_1>Total :</Bold_1>
              <StyledInput width="60%" value={Total} />
            </RowView>
          </>
        ) : (
          <>
            <RowView>
              <Bold_1>Gross Weight :</Bold_1>
              <StyledInput
                width="60%"
                value={GrossWeight}
                onChange={onGrossChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Tare Weight :</Bold_1>
              <StyledInput
                width="60%"
                value={TareWeight}
                onChange={onTareChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Net Weight :</Bold_1>
              <StyledInput
                width="60%"
                value={NetWeight}
                onChange={onNetWeightChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Price :</Bold_1>
              <StyledInput
                width="60%"
                value={WeightPrice}
                onChange={onWeightPriceChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Total :</Bold_1>
              <StyledInput width="60%" value={Total} />
            </RowView>
          </>
        )}
        {IMG && IMG.length != 0 ? (
          <Bold_1 style={{ marginTop: "10px" }}>Photo:</Bold_1>
        ) : null}
        <InvoiceImage>
          {IMG &&
            IMG.map((item, index) => {
              return (
                <>
                  <ImageModal url={item.url} margin={true} />
                </>
              );
            })}
        </InvoiceImage>
      </InvoiceItemView>
    </>
  );
}
