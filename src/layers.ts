import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import {
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  TextSymbol,
  Font,
} from "@arcgis/core/symbols";
import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import {
  centerlineProjectColor,
  color_completed,
  color_nonworkable,
  color_nonworkable_obstruction,
  color_nonworkable_obstruction_struc,
  color_workable,
  labelStation_fontSize,
  lineWidth,
  maxScale,
  minScale,
  opacity,
  pier_number_halo_color,
  pier_number_halo_size,
  pointColor,
  pointOutlineWidth,
  pointSize,
  strip_map_uniqueValueInfos,
  util_marker_size,
  workable_fields,
  workable_piers_uniqueValueInfos,
  yoffset_pierNumber,
} from "./UniqueValues";

export const basemapUserDefined = new Basemap({
  baseLayers: [
    new VectorTileLayer({
      portalItem: {
        id: "c62a1769441f4dfca8ef64dd860d6d15", // dark-gray: '824fe99ab989479f83b9a6d7f2da0bcb',
      },
    }),
  ],
});

export const stationPointSymbol_nscrex = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    style: "circle",
    color: pointColor,
    size: pointSize, // pixels
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: centerlineProjectColor.nscr_hex,
      width: pointOutlineWidth, // points
    },
  }),
});

export const lineSymbol_nscrex = new SimpleRenderer({
  label: "NSCR-Ex",
  symbol: new SimpleLineSymbol({
    color: centerlineProjectColor.nscrex_hex,
    width: lineWidth,
    style: "solid",
  }),
});

/* CP cut-off line */
const cp_break_line_label = new LabelClass({
  symbol: new TextSymbol({
    color: "white",
    haloColor: "#9ca3af",
    haloSize: 0.3,
    yoffset: 5,
    xoffset: -10,
    font: {
      size: 7,
      // weight: 'bold',
    },
  }),
  labelPlacement: "above-before",
  labelExpressionInfo: {
    expression: "$feature.CP_Start",
  },
});
const cp_break_line_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#4ce600",
    width: "2px",
  }),
});
export const cp_break_lines = new FeatureLayer({
  portalItem: {
    id: "38c8a9beadcc456191f0f0768acde8f2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "CP Break Line",
  renderer: cp_break_line_renderer,
  labelingInfo: [cp_break_line_label],
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});
cp_break_lines.listMode = "hide";

/* ROW Layer */
var prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer.listMode = "hide";

/* Strip Map Index  */
const defaultFill = new SimpleFillSymbol({
  color: [169, 169, 169, 0.7],
  outline: {
    width: 0.8,
    color: "grey",
  },
});

const stripMapRenderer = new UniqueValueRenderer({
  field: "Workability",
  defaultSymbol: defaultFill,
  uniqueValueInfos: strip_map_uniqueValueInfos,
});

export const stripMapLayer = new FeatureLayer({
  portalItem: {
    id: "2f183f5686314b958a4e13a811960c12",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  outFields: ["PhotoURL", "PageNumber", "Angle"],
  title: "Strip Map",
  popupEnabled: false,
  renderer: stripMapRenderer,
  maxScale: 5000,
  minScale: 0,
});

/* Pile Cap */
const defaultSymbolPierCap = new SimpleFillSymbol({
  color: [225, 225, 225],
  style: "solid",
  outline: new SimpleLineSymbol({
    color: [110, 110, 110],
    width: 1,
  }),
});

export const pier_number_label_workable_all = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 0",
});

export const pier_number_label_nonworkable_all = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 1",
});

export const pier_number_label_completed_all = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

export const pier_number_label_workable_land = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "LandWorkable = 0",
});

export const pier_number_label_nonworkable_land = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "LandWorkable = 1",
});

export const pier_number_label_completed_land = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

export const pier_number_label_workable_struc = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "StrucWorkable = 0",
});

export const pier_number_label_nonworkable_struc = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "StrucWorkable = 1",
});

export const pier_number_label_completed_struc = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

export const pier_number_label_workable_nlo = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "NLOWorkable = 0",
});

export const pier_number_label_nonworkable_nlo = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "NLOWorkable = 1",
});

export const pier_number_label_completed_nlo = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

export const pier_number_label_workable_utility = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "UtilWorkable = 0",
});

export const pier_number_label_nonworkable_utility = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "UtilWorkable = 1",
});

export const pier_number_label_completed_utility = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

export const pier_number_label_workable_others = new LabelClass({
  symbol: new TextSymbol({
    color: color_workable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "OthersWorkable = 0",
});

export const pier_number_label_nonworkable_others = new LabelClass({
  symbol: new TextSymbol({
    color: color_nonworkable,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "OthersWorkable = 1",
});

export const pier_number_label_completed_others = new LabelClass({
  symbol: new TextSymbol({
    color: color_completed,
    haloColor: pier_number_halo_color,
    haloSize: pier_number_halo_size,
    yoffset: yoffset_pierNumber,
    font: {
      size: 10,
      weight: "bold",
    },
  }),
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
  },
  where: "AllWorkable = 2",
});

// Workable piers for labels
export const pierNumberLayer_label_all = [
  pier_number_label_nonworkable_all,
  pier_number_label_workable_all,
  pier_number_label_completed_all,
];

export const pierNumberLayer_label_land = [
  pier_number_label_nonworkable_land,
  pier_number_label_workable_land,
  pier_number_label_completed_land,
];

export const pierNumberLayer_label_struc = [
  pier_number_label_nonworkable_struc,
  pier_number_label_workable_struc,
  pier_number_label_completed_struc,
];

export const pierNumberLayer_label_nlo = [
  pier_number_label_nonworkable_nlo,
  pier_number_label_workable_nlo,
  pier_number_label_completed_nlo,
];

export const pierNumberLayer_label_utility = [
  pier_number_label_nonworkable_utility,
  pier_number_label_workable_utility,
  pier_number_label_completed_utility,
];

export const pierNumberLayer_label_others = [
  pier_number_label_nonworkable_others,
  pier_number_label_workable_others,
  pier_number_label_completed_others,
];

export const pier_number_point_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 1,
    color: [0, 0, 0, 0],
    outline: {
      color: [110, 110, 110],
      width: 0.2,
    },
  }),
});

export const pile_cap_renderer_all = new UniqueValueRenderer({
  field: workable_fields[0],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pile_cap_renderer_land = new UniqueValueRenderer({
  field: workable_fields[1],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pile_cap_renderer_structure = new UniqueValueRenderer({
  field: workable_fields[2],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pile_cap_renderer_nlo = new UniqueValueRenderer({
  field: workable_fields[3],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pile_cap_renderer_utility = new UniqueValueRenderer({
  field: workable_fields[4],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pile_cap_renderer_others = new UniqueValueRenderer({
  field: workable_fields[5],
  // defaultSymbol: defaultSymbolPierCap,
  uniqueValueInfos: workable_piers_uniqueValueInfos,
});

export const pileCapLayer = new FeatureLayer({
  portalItem: {
    id: "6f4bf8c34d344277bb69f6590096203f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  title: "Pile Cap",
  minScale: 150000,
  maxScale: 0,
  renderer: pile_cap_renderer_all,
  labelingInfo: [
    pier_number_label_workable_all,
    pier_number_label_nonworkable_all,
  ],
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

//// Station point
export const n2_station_label: any = new TextSymbol({
  color: centerlineProjectColor.nscrex_hex,
  haloColor: "white",
  haloSize: 0.4,
  yoffset: -20,
  font: new Font({
    size: labelStation_fontSize,
    weight: "bold",
  }),
});

export const n2LabelStation = new LabelClass({
  symbol: n2_station_label,

  deconflictionStrategy: "none", // show overlapping numbers
  labelPlacement: "center-left",
  labelExpressionInfo: {
    expression: "$feature.StnName",
  },
  minScale: minScale,
  maxScale: maxScale,
});

export const n2StationLayer = new FeatureLayer({
  portalItem: {
    id: "ace32f63bafc40f6bcfeecbee5fa6c69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Station",
  popupEnabled: false,
  definitionExpression: "Station <> 'NCC'",
  renderer: stationPointSymbol_nscrex,
  labelingInfo: [n2LabelStation], //[n2LabelStation],
  opacity: opacity,
});
n2StationLayer.listMode = "hide";

/* Obstructed land */
var lotIdLabel = new LabelClass({
  labelExpressionInfo: { expression: "$feature.LotID" },
  symbol: {
    type: "text",
    color: "black", //'#E1E1E1',
    haloColor: "#E1E1E1",
    haloSize: 0.35,
    font: {
      size: 9,
      // weight: 'bold',
    },
  },
  minScale: 3000,
  maxScale: 0,
});

const lot_layer_renderer = new UniqueValueRenderer({
  field: "Obstruction",
  uniqueValueInfos: [
    {
      value: "Yes",
      label: "Obstruction",
      symbol: new SimpleFillSymbol({
        color: color_nonworkable_obstruction,
        // style: 'backward-diagonal',
        outline: {
          width: 1,
          color: "black",
        },
      }),
    },
    // {
    //   value: 'No',
    //   label: 'Workable',
    //   symbol: new SimpleFillSymbol({
    //     color: color_workable_obstruction,
    //     // style: 'backward-diagonal',
    //     outline: {
    //       width: 1,
    //       color: 'black',
    //     },
    //   }),
    // },
  ],
});

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  labelingInfo: [lotIdLabel],
  renderer: lot_layer_renderer,
  // popupTemplate: templateLot,
  outFields: ["LotID"],
  title: "Land Acquisition",
  definitionExpression: "OwnershipType = 0 and Obstruction = 'Yes'",
  minScale: 10000,
  maxScale: 0,
  popupTemplate: {
    title: "{LotID}: {StatusLA}",
    lastEditInfoEnabled: false,
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Obstructed Structure */
var strucLabel = new LabelClass({
  labelExpressionInfo: { expression: "$feature.StrucID" },
  symbol: {
    type: "text",
    color: "black", //'#E1E1E1',
    haloColor: "#E1E1E1",
    haloSize: 0.35,
    font: {
      size: 8,
      // weight: 'bold',
    },
  },
});

const struc_layer_renderer = new UniqueValueRenderer({
  field: "Obstruction",
  uniqueValueInfos: [
    {
      value: "Yes",
      label: "Obstruction",
      symbol: new SimpleFillSymbol({
        color: color_nonworkable_obstruction_struc,
        // style: 'backward-diagonal',
        outline: {
          style: "short-dash",
          width: 1,
          color: "black",
        },
      }),
    },
    // {
    //   value: 'No',
    //   label: 'Workable',
    //   symbol: new SimpleFillSymbol({
    //     color: color_workable_obstruction,
    //     // style: 'backward-diagonal',
    //     outline: {
    //       width: 1,
    //       color: 'black',
    //     },
    //   }),
    // },
  ],
});

export const structureLayer = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  labelingInfo: [strucLabel],
  renderer: struc_layer_renderer,
  definitionExpression: "Obstruction = 'Yes'",
  // popupTemplate: templateLot,
  title: "Structure",
  minScale: 2500,
  maxScale: 0,
  popupTemplate: {
    title: "{StrucID}: {StatusStruc}",
    lastEditInfoEnabled: false,
  },
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* NLO point */
// const nlo_renderer = new UniqueValueRenderer({
//   valueExpression: "When($feature.StatusRC == 1, 'Relocated', 'Others')",
//   uniqueValueInfos: [
//     {
//       value: 'Relocated',
//       label: 'Relocated',
//       symbol: new SimpleMarkerSymbol({
//         style: 'circle',
//         color: color_workable,
//         size: '7px',
//         outline: {
//           width: 0.3,
//           color: 'black',
//         },
//       }),
//     },
//     {
//       value: 'Others',
//       label: 'Un-relocated',
//       symbol: new SimpleMarkerSymbol({
//         style: 'circle',
//         color: color_nonworkable,
//         size: '7px',
//         outline: {
//           width: 0.3,
//           color: 'black',
//         },
//       }),
//     },
//   ],
// });

// const nlo_renderer = new SimpleRenderer({
//   label: 'Obstruction',
//   symbol: new SimpleMarkerSymbol({
//     color: 'red',
//     size: '8px',
//     outline: {
//       width: 0.3,
//       color: 'black',
//     },
//   }),
// });

const nlo_renderer = new UniqueValueRenderer({
  field: "Obstruction",
  uniqueValueInfos: [
    {
      value: "Yes",
      label: "Obstruction",
      symbol: new SimpleMarkerSymbol({
        color: "red",
        size: "8px",
        outline: {
          width: 0.3,
          color: "black",
        },
      }),
    },
    // {
    //   value: 'No',
    //   label: 'Workable',
    //   symbol: new SimpleFillSymbol({
    //     color: color_workable_obstruction,
    //     // style: 'backward-diagonal',
    //     outline: {
    //       width: 1,
    //       color: 'black',
    //     },
    //   }),
    // },
  ],
});

export const nloLayer = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  renderer: nlo_renderer,
  definitionExpression: "StatusRC > 1",
  title: "NLO (Non-Land Owner)",
  elevationInfo: {
    mode: "on-the-ground",
  },
  minScale: 3000,
  maxScale: 0,
  popupTemplate: {
    title: "{StrucID}: {StatusRC}",
    lastEditInfoEnabled: false,
  },
});

// Utility Point
function getUniqueValueSymbol(name: string, size: number) {
  return new SimpleRenderer({
    symbol: new PictureMarkerSymbol({
      url: name,
      width: size,
      height: size,
    }),
  });
}

function util_type_symbol(name: string, size: string) {
  return new PictureMarkerSymbol({
    url: name,
    width: size,
    height: size,
  });
}

const utility_marker_renderer = new UniqueValueRenderer({
  // field: 'UtilType',
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.Status == 0 && $feature.UtilType == 1, 'Telecom',\
                      $feature.Status == 0 && $feature.UtilType == 2, 'Water', \
                      $feature.Status == 0 && $feature.UtilType == 3, 'Sewage', \
                      $feature.Status == 0 && $feature.UtilType == 4, 'Power', \
                      $feature.Status == 0 && $feature.UtilType == 5, 'Oil',$feature.Comp_Agency)",

  uniqueValueInfos: [
    {
      value: "Telecom", // Telecom/Cable TV
      symbol: util_type_symbol(
        "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
        util_marker_size
      ),
    },
    {
      value: "Water", // water
      symbol: util_type_symbol(
        "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
        util_marker_size
      ),
    },
    {
      value: "Sewage", // Sewage
      symbol: util_type_symbol(
        "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
        util_marker_size
      ),
    },
    {
      value: "Power", // Power
      symbol: util_type_symbol(
        "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
        util_marker_size
      ),
    },
    {
      value: "Oil", // Oil & Gas
      symbol: util_type_symbol(
        "https://EijiGorilla.github.io/Symbols/Gas_Logo2.svg",
        util_marker_size
      ),
    },
  ],
});

export const utilityPointLayer = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Utility",
  minScale: 5000,
  maxScale: 0,
  renderer: utility_marker_renderer,
  popupTemplate: {
    title: "{UtilType}: {Status} for {LAYER} work",
    lastEditInfoEnabled: false,
  },
});

///////////////////////////////////////////////////////
// ----------------- Overview Map ----------------//

export const n2StationLayer_overview = new FeatureLayer({
  portalItem: {
    id: "ace32f63bafc40f6bcfeecbee5fa6c69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Station",
  popupEnabled: false,
  definitionExpression: "Station <> 'NCC'",
  renderer: stationPointSymbol_nscrex,
  labelingInfo: [n2LabelStation], //[n2LabelStation],
  opacity: opacity,
});
n2StationLayer_overview.listMode = "hide";

export const pileCapLayer_overview = new FeatureLayer({
  portalItem: {
    id: "6f4bf8c34d344277bb69f6590096203f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  title: "Pile Cap",
  // minScale: 150000,
  maxScale: 0,
  renderer: pile_cap_renderer_all,
  labelingInfo: [
    pier_number_label_workable_all,
    pier_number_label_nonworkable_all,
  ],
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

export const prowLayer_overview = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer_overview.listMode = "hide";

export const lineSymbolOverview_nscrex = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: centerlineProjectColor.nscrex_hex,
    width: "2.5px",
    style: "solid",
  }),
});

export const n2CenterlineOverView = new FeatureLayer({
  portalItem: {
    id: "ace32f63bafc40f6bcfeecbee5fa6c69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: lineSymbolOverview_nscrex,
  layerId: 2,
  popupEnabled: false,
});

export const lotLayer_overview = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  // labelingInfo: [lotIdLabel],
  labelsVisible: false,
  renderer: lot_layer_renderer,
  // popupTemplate: templateLot,
  title: "Land Acquisition",
  // minScale: 20000,
  maxScale: 0,
  popupEnabled: false,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

export const structureLayer_overview = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  // labelingInfo: [strucLabel],
  labelsVisible: false,
  renderer: struc_layer_renderer,
  definitionExpression: "Obstruction = 'Yes'",
  // popupTemplate: templateLot,
  title: "Structure",
  // minScale: 3500,
  maxScale: 0,
  popupEnabled: false,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

export const nloLayer_overview = new FeatureLayer({
  portalItem: {
    id: "23500954a8d84a46886e76e6e0883a69",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  renderer: nlo_renderer,
  definitionExpression: "StatusRC > 1",
  title: "NLO (Non-Land Owner)",
  elevationInfo: {
    mode: "on-the-ground",
  },
  // minScale: 3000,
  maxScale: 0,
  popupEnabled: false,
});

export const utilityPointLayer_overview = new FeatureLayer({
  portalItem: {
    id: "7507e625f480470a9af257d60cf67c1c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Utility",
  // minScale: 5000,
  maxScale: 0,
  renderer: utility_marker_renderer,
  popupEnabled: false,
});

/* Strip Map Index  */
// const stripMapRenderer_overview = new UniqueValueRenderer({
//   field: 'NonWorkable',
//   uniqueValueInfos: strip_map_uniqueValueInfos_overview,
// });

export const stripMapLayer_overview = new FeatureLayer({
  portalItem: {
    id: "2f183f5686314b958a4e13a811960c12",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  outFields: ["PhotoURL", "PageNumber"],
  title: "Strip Map",
  popupEnabled: false,
  visible: false,
  // renderer: stripMapRenderer_overview,
  // maxScale: 0,
  // minScale: 1000,
});

// date table
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});
