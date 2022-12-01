export const onTareChange = (e, item, func) => {
  item.details.TareWeight = e.target.value;
  item.details.NetWeight =
    parseFloat(item.details.GrossWeight) - parseFloat(item.details.TareWeight);
  item.details.Total =
    parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
  func();
};
export const onGrossChange = (e, item, func) => {
  item.details.GrossWeight = e.target.value;
  item.details.NetWeight =
    parseFloat(item.details.GrossWeight) - parseFloat(item.details.TareWeight);
  item.details.Total =
    parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
  func();
};
export const onWeightPriceChange = (e, item, func) => {
  item.details.WeightPrice = e.target.value;
  item.details.Total =
    parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
  func();
};
export const onUnitChange = (e, item, func) => {
  item.details.Unit = e.target.value;
  item.details.Total =
    parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
  func();
};
export const onUnitPriceChange = (e, item, func) => {
  item.details.UnitPrice = e.target.value;
  item.details.Total =
    parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
  func();
};
export const setDefaultValue = (item, func) => {
  item.details.GrossWeight = 0;
  item.details.TareWeight = 0;
  item.details.NetWeight = 0;
  item.details.Unit = 0;
  item.details.GrossPrice = 0;
  item.details.UnitPrice = 0;
  item.details.WeightPrice = 0;
  item.details.Total = 0;
  func();
};
