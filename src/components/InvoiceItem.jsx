import React, { useEffect, useState } from "react";
import { DollerSymbol, StyledInput } from "../styles/Input.styles";
import {
  InvoiceImage,
  InvoiceItemView,
  RowView,
  TouchView,
} from "../styles/Invoice.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { convertIntoDoller } from "../utils/ConvertIntoDoller";
import { getData } from "../utils/firebase/firebaseApi";
import { Bold_1, ItemTitle, View_6, View_6_Row } from "../utils/GlobalStyles";
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
}) {
  const re = /(^[0-9]+$|^$)/;
  console.log(WeightType == "");
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemList();
  }, []);

  const Touch1_click = WeightType != "Unit" ? onWeightTypeChange : null;
  const Touch2_click = WeightType != "Weight" ? onWeightTypeChange : null;
  const Touch1_color = WeightType == "Unit" ? "#2a547e" : null;
  const Touch2_color =
    WeightType == "Weight" || (" " && WeightType != "Unit") ? "#2a547e" : null;
  const textColor1 = WeightType == "Unit" ? "white" : "black";
  const textColor2 =
    WeightType == "Weight" || (" " && WeightType != "Unit") ? "white" : "black";

  const unitError = Unit ? !re.test(parseFloat(Unit)) : false;
  const unitPriceError = UnitPrice ? !re.test(parseFloat(UnitPrice)) : false;
  const grossError = GrossWeight ? !re.test(parseFloat(GrossWeight)) : false;
  const tareError = TareWeight ? !re.test(parseFloat(TareWeight)) : false;
  const WeightPriceError = WeightPrice
    ? !re.test(parseFloat(WeightPrice))
    : null;
  const boldTextStyle = {
    fontWeight: "600",
    paddingInline: "30px",
  };
  return (
    <>
      <InvoiceItemView>
        <RowView>
          <ItemTitle>
            {index}) {ItemName}
          </ItemTitle>
          <PhotoCapture title="Add Photo" handleChange={onImagePic} />
        </RowView>
        <RowView style={{ marginTop: "20px" }}>
          <Bold_1>WeightType </Bold_1>
          <View_6_Row>
            <TouchView
              onClick={Touch1_click}
              background={Touch1_color}
              color={textColor1}
            >
              <Bold_1>Unit</Bold_1>
            </TouchView>
            <TouchView
              onClick={Touch2_click}
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
                width="60%"
                error={grossError}
                value={GrossWeight}
                onChange={onGrossChange}
              />
            </RowView>
            <RowView>
              <Bold_1>Tare Weight :</Bold_1>
              <StyledInput
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
