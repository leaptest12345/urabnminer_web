import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DollerSymbol, StyledInput } from "../styles/Input.styles";
import {
  boldTextStyle,
  DeleteBtn,
  InvoiceImage,
  InvoiceItemView,
  RowView,
  TouchView,
} from "../styles/Invoice.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { convertIntoDoller } from "../utils/ConvertIntoDoller";
import { getData } from "../utils/firebase/firebaseApi";
import {
  Bold_1,
  DeleteView,
  ItemTitle,
  View_6,
  View_6_Row,
} from "../utils/GlobalStyles";
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
  onImagePic,
  IMG,
  index,
  onWeightTypeChange,
  WeightType,
  onDelete,
  disabled,
}) {
  const re = /^[0-9]+$/;
  const [itemList, setItemList] = useState([]);
  const getItemList = async () => {
    try {
      const itemList = await getData(`ADMIN/ITEM`);
      let arr = [];
      ArrayConverter(itemList).map((item) => {
        arr.push({
          id: item.ID,
          label: item.title,
        });
      });
      setItemList(arr);
    } catch (error) {}
  };
  useEffect(() => {
    getItemList();
  }, []);
  const Touch1_click = WeightType != "Unit" ? onWeightTypeChange : null;
  const Touch2_click = WeightType != "Weight" ? onWeightTypeChange : null;
  const Touch1_color = WeightType == "Unit" ? "#2a547e" : null;
  const Touch2_color = WeightType == "Weight" ? "#2a547e" : null;
  const textColor1 = WeightType == "Unit" ? "white" : "black";
  const textColor2 = WeightType == "Weight" ? "white" : "black";
  const unitError = Unit ? !re.test(Unit.toString()) : false;
  const unitPriceError = UnitPrice ? !re.test(UnitPrice.toString()) : false;
  const grossError = GrossWeight ? !re.test(GrossWeight.toString()) : false;
  const tareError = TareWeight ? !re.test(TareWeight.toString()) : false;
  const WeightPriceError = WeightPrice
    ? !re.test(WeightPrice.toString())
    : null;

  return (
    <>
      <InvoiceItemView>
        <RowView>
          <ItemTitle>
            {index}) {ItemName}
          </ItemTitle>
          {!disabled ? <DeleteBtn onClick={onDelete} /> : null}
        </RowView>
        <RowView style={{ marginTop: "20px" }}>
          <Bold_1>WeightType </Bold_1>
          <View_6_Row>
            <TouchView
              onClick={disabled ? null : Touch1_click}
              background={Touch1_color}
              color={textColor1}
            >
              <Bold_1>Unit</Bold_1>
            </TouchView>
            <TouchView
              onClick={disabled ? null : Touch2_click}
              background={Touch2_color}
              color={textColor2}
            >
              <Bold_1>Weight</Bold_1>
            </TouchView>
          </View_6_Row>
        </RowView>
        <RowView zIndex={true}>
          <Bold_1>ItemName :</Bold_1>
          <View_6>
            <SearchAutoComplete
              disabled={disabled}
              clearIcon={false}
              searchOptions={itemList}
              onChange={onItemChange}
              defaultValue={ItemName}
            />
          </View_6>
        </RowView>
        {WeightType == "Unit" ? (
          <>
            <RowView>
              <Bold_1>Unit :</Bold_1>

              <StyledInput
                disabled={disabled}
                error={unitError}
                width="60%"
                value={Unit}
                onChange={onUnitChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Price :</Bold_1>
              <DollerSymbol>$</DollerSymbol>
              <StyledInput
                disabled={disabled}
                error={unitPriceError}
                width="60%"
                value={UnitPrice}
                onChange={onUnitPriceChange}
                style={boldTextStyle}
              />
            </RowView>
            <RowView>
              <Bold_1>Total :</Bold_1>
              <Bold_1 color={Math.sign(Total) === -1 ? "red" : "black"}>
                {isNaN(Total) ? "0" : convertIntoDoller(Total)}
              </Bold_1>
            </RowView>
          </>
        ) : (
          <>
            <RowView>
              <Bold_1>Gross Weight :</Bold_1>
              <StyledInput
                disabled={disabled}
                width="60%"
                error={grossError}
                value={GrossWeight}
                onChange={onGrossChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Tare Weight :</Bold_1>
              <StyledInput
                disabled={disabled}
                width="60%"
                error={tareError}
                value={TareWeight}
                onChange={onTareChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Net Weight :</Bold_1>
              <Bold_1 color={Math.sign(NetWeight) === -1 ? "red" : "black"}>
                {isNaN(NetWeight) ? "0" : NetWeight}
              </Bold_1>
            </RowView>
            <RowView>
              <Bold_1>Price :</Bold_1>
              <DollerSymbol>$</DollerSymbol>
              <StyledInput
                disabled={disabled}
                width="60%"
                error={WeightPriceError}
                value={WeightPrice}
                onChange={onWeightPriceChange}
                style={boldTextStyle}
              />
            </RowView>
            <RowView>
              <Bold_1>Total :</Bold_1>
              <Bold_1 color={Math.sign(Total) === -1 ? "red" : "black"}>
                {isNaN(Total) ? "0" : convertIntoDoller(Total)}
              </Bold_1>
            </RowView>
          </>
        )}
        <RowView style={{ marginTop: "20px" }}>
          <Bold_1>Photo: </Bold_1>
          {!disabled ? (
            <View_6>
              <PhotoCapture width="15%" title="+" handleChange={onImagePic} />
            </View_6>
          ) : null}
        </RowView>
        {/* {IMG && IMG.length != 0 ? (
          <Bold_1 style={{ marginTop: "10px" }}>Photo:</Bold_1>
        ) : null} */}
        <InvoiceImage>
          {IMG &&
            IMG.map((item, index) => {
              return (
                <>
                  <ImageModal
                    url={item?.base64 ? item.base64 : item.url}
                    margin={true}
                    key={index + 1 + "?"}
                  />
                </>
              );
            })}
        </InvoiceImage>
      </InvoiceItemView>
    </>
  );
}
