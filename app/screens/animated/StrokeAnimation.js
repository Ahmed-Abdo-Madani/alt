import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import Svg from "react-native-svg";
import AnimatedStroke from "./AnimatedStroke";

const MARGIN = 10;
const vWidth = 676 + MARGIN;
const vHeight = 866 + MARGIN;
const width = Dimensions.get("window").width - 64;
const height = (width * vHeight) / vWidth;
const paths = [
  "M339 276.58C333.4 280.92 328.59 284.66 324.4 287.9C328.77 293.11 332.71 297.79 336.97 302.85C342.35 298.19 346.78 294.35 351.69 290.09C347.3 285.44 343.45 281.33 339 276.58ZM345.7 683.77C372.86 689.14 435.82 677.84 450.55 659.77C435.37 641.72 420.6 637.13 399.85 647.67C382.2 656.63 366.04 668.51 349.28 679.21C347.98 680.04 347.24 681.77 345.7 683.77ZM340.82 665.74C341.49 666.22 342.17 666.7 342.84 667.18C350.44 661.33 357.73 655.03 365.69 649.72C382.01 638.83 397.98 627.09 415.39 618.29C432.63 609.57 450.41 612.76 466.02 624.58C474.81 631.24 476.22 635.39 472.88 645.91C465.92 667.83 452.55 684.34 431.45 694.37C410.73 704.22 388.63 708.79 366.22 712.48C363.74 712.89 359.81 714.78 359.53 716.47C358.48 722.81 358.05 729.51 363.3 734.72C400.9 772.01 444.69 790.76 498.16 778.35C537.87 769.13 560.14 744.28 564.98 703.96C567.37 684.04 564.89 664.16 560.22 644.66C552.28 611.5 535.13 582.99 514.56 556.43C463.22 490.13 400.28 434.87 341.75 375.42C338.39 372.01 335.87 373.14 332.99 376.07C286.13 423.64 238.81 470.78 192.49 518.88C168.79 543.5 148.25 570.82 131.97 601.13C114.22 634.18 107.72 669.56 111.01 706.58C114.33 743.98 137.66 766.08 171.38 776.81C217.25 791.41 272.39 777.37 311.94 734.81C314.66 731.88 315.48 726.78 316.25 722.53C317.12 717.72 314.52 715.23 309.41 715.11C301.94 714.94 294.37 715.08 287.04 713.86C267.01 710.52 253.1 695.85 236.31 686.34C238.37 685.38 240 685.34 241.62 685.38C262.77 685.94 283.94 687.25 305.08 686.88C322.92 686.56 332.56 676 333.62 658.39C333.76 656.15 333.83 653.9 333.83 651.66C333.95 606.31 334.09 560.95 334.06 515.59C334.06 511.93 333.81 507.79 332.15 504.7C323.03 487.65 331.56 474.86 341.46 461.9C344.31 467.78 346.04 474.06 349.84 478.61C357.28 487.52 354.66 495.85 351.07 505.02C348.53 511.54 345.76 518.57 345.74 525.37C345.65 553.78 347.26 582.19 346.82 610.58C346.56 626.87 343.56 643.12 341.76 659.38C341.55 661.5 341.15 663.61 340.82 665.74ZM146.44 804.17C99.75 780.56 58.38 750.28 30.92 704.7C-4.10002 646.58 -10.59 586.48 20.98 524.15C40.09 486.41 65.48 453.4 93.77 422.38C143.95 367.35 200.33 319.03 257.55 271.63C257.92 271.32 258.18 270.88 259 269.9C234.7 226.75 217.67 180.96 216.47 130.26C230.66 174.14 254.05 212.68 284.14 248.54C289.77 243.81 294.99 239.43 300.82 234.53C262.25 186.27 235.19 133.87 232.33 71.55C231.24 47.78 234.36 24.47 241.37 0.840027C241.37 17.07 240.09 32.5 241.63 47.65C245.31 83.99 259.76 116.63 282.18 144.98C297.4 164.21 315.64 181.06 332.53 198.96C335.48 202.09 338.33 202.97 342.1 199.73C385.2 162.75 419.12 119.8 431.7 62.88C436.04 43.23 436.76 23.42 433.58 2.59003C440.79 14.57 445.13 53.26 442.42 84.14C439.96 112.19 432.65 139.25 419.45 164.03C406.51 188.31 391.38 211.43 376.52 236.2C380.19 239.28 385.42 243.66 391.04 248.37C407.04 230.97 420.32 212.32 431.05 192.08C441.62 172.14 450.73 151.44 461.32 130.83C458.28 148.59 455.95 166.51 452.03 184.08C446.03 210.98 434.66 235.92 421.71 260.15C416.48 269.94 416.53 269.95 424.71 276.9C476.75 321.12 529.01 365.12 575.5 415.36C605.18 447.44 633 480.96 652.65 520.41C663.12 541.45 671.71 563.17 674.42 586.75C678.29 620.44 670.53 652.07 656.7 682.46C636.63 726.57 603.67 759.08 563.42 784.85C556.39 789.35 549.08 793.42 541.14 796.51C546.46 792.72 551.88 789.05 557.09 785.12C587.79 761.98 612.45 734.17 623.84 696.56C635.21 659.05 629.33 622.54 615.74 586.91C598.39 541.41 570.66 502.21 539.64 465.21C494.8 411.73 443.47 364.89 390.2 320.08C389.08 319.14 387.76 318.43 385.61 316.99C381.51 321.93 377.47 326.8 372.78 332.45C376.34 335.68 379.5 338.74 382.86 341.57C437.64 387.78 489.69 436.75 533.93 493.39C560.89 527.89 584.51 564.44 597.34 606.86C608.39 643.37 608.71 679.26 591.39 714.43C568.59 760.73 488.09 819.75 420.33 815.71C392.55 814.05 367.95 804.22 345.8 788.06C339.72 783.62 335.74 783.64 329.7 788.06C303.57 807.17 274.46 817.38 241.69 815.57C220.24 814.38 200.04 808.46 180.8 799.19C158.23 788.32 137.44 774.62 118.74 757.98C72.31 716.7 59.09 661.59 80.66 599.44C95.91 555.5 121.59 517.68 150.74 482.01C194.13 428.91 244.22 382.58 296.39 338.37C298.28 336.77 300.14 335.13 302.9 332.75C299.11 328.08 295.74 323.21 291.53 319.25C290.53 318.31 286.07 319.65 284.26 321.19C267.93 335.06 251.61 348.96 235.7 363.32C185.85 408.35 138.83 456.04 100.5 511.57C77.72 544.57 59.04 579.58 50.3 619.16C38.77 671.38 50.94 717.3 87.07 756.82C104.33 775.78 124.68 790.81 146.44 804.17ZM288.14 843.88C292.16 840.44 294.83 837.66 297.96 835.59C303.1 832.2 310.13 825.5 313.53 826.93C321.02 830.08 326.76 837.4 333.12 843.13C333.76 843.71 334.3 845.49 333.95 845.91C328.76 851.94 323.99 858.58 317.79 863.34C315.59 865.03 308.92 863.24 305.86 860.95C299.71 856.33 294.64 850.29 288.14 843.88ZM384.53 847.42C378.41 852.99 372.84 858.71 366.58 863.55C361.8 867.25 357.32 863.8 353.67 860.68C349.46 857.08 345.64 853.02 341.84 848.98C338.31 845.23 339.01 841.85 343.06 838.78C347.29 835.57 351.45 832.24 355.45 828.75C359.36 825.33 362.88 825.12 366.75 828.85C370.94 832.88 375.49 836.54 379.69 840.57C381.25 842.06 382.25 844.14 384.53 847.42Z",
];

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const StrokeAnimation = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 3000,
      easing: Easing.cubic,
    });
  }, [progress]);

  return (
    <View style={styles.layer}>
      {/* <View style={styles.layer}>
        <AnimatedLogo progress={progress} />
      </View> */}

      <Svg
        width={width / 2}
        height={height / 2}
        viewBox={[
          -MARGIN / 2,
          -MARGIN / 2,
          vWidth + MARGIN / 2,
          vHeight + MARGIN / 2,
        ].join(" ")}
      >
        {paths.map((d, key) => (
          <AnimatedStroke progress={progress} d={d} key={key} />
        ))}
      </Svg>
    </View>
  );
};

export default StrokeAnimation;