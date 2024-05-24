/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Denture from "./denture";
// import "./odontogram.scss";

function Odontogram(props) {
  return (
    <div className="flex flex-wrap">
      <Denture
        top_1
        tooth={(labelT, zoneT, idT) => {
          props.tooth(labelT, zoneT, idT);
        }}
        Rtooth={(id) => {
          props.rtooth(id);
        }}
      />
      <Denture
        top_2
        tooth={(labelT, zoneT, idT) => {
          props.tooth(labelT, zoneT, idT);
        }}
        Rtooth={(id) => {
          props.rtooth(id);
        }}
      />
      <Denture
        bottom_1
        tooth={(labelT, zoneT, idT) => {
          props.tooth(labelT, zoneT, idT);
        }}
        Rtooth={(id) => {
          props.rtooth(id);
        }}
      />
      <Denture
        bottom_2
        tooth={(labelT, zoneT, idT) => {
          props.tooth(labelT, zoneT, idT);
        }}
        Rtooth={(id) => {
          props.rtooth(id);
        }}
      />
    </div>
  );
}

export default Odontogram;
