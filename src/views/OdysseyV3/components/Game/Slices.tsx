const Slice = ({ isFill, svgProps, path }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgProps.width} ${svgProps.height}`}
      fill="none"
      {...svgProps}
    >
      <path
        d={path}
        fill={isFill ? '#2F2F2F' : 'transparent'}
        stroke="#876F50"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default [
  {
    component: Slice,
    svgProps: {
      width: 118,
      height: 53,
      style: {
        top: '0px',
        left: '0px',
      },
    },
    path: 'M-5 22.5C-3.8 28.5 -5.5 43.6667 -6 50.5C2 50.5 15.5 52.7 21.5 51.5C29 50 31.5 46.5 28 34.5C25.6532 26.4537 28 14.5 41 14.5C54 14.5 57 29 54 38C51 47 53.5 51 63 51.5C70.6 51.9 81.3333 51.6667 85.5 51.5C85.5 48.5 84.5 30 84.5 22.5C84.5 15.4822 91 15.5 98.5 17C107.969 18.8938 118 10.5 116.5 -2.5C115.346 -12.5 108.5 -20 95 -17C81.5 -14 84.1667 -37.1667 85.5 -49.5C79 -51 68.4 -52 64 -52C58.5 -52 50.7772 -49.5992 54.5 -37.5C58.5 -24.5 53.5 -15 42.5 -14C31.5 -13 25 -23.5 28.5 -36.5C32 -49.5 24.5 -51 15 -51C7.4 -51 -0.5 -50 -3.5 -49.5C-3.16667 -46 -3.9 -35.3 -3.5 -26.5C-3 -15.5 -10 -14 -17 -17C-24 -20 -37 -15.5 -37 -2.5C-37 10.5 -28.5 15.5 -19 14.5C-9.5 13.5 -6.5 15 -5 22.5Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 94,
      height: 89,
      style: {
        top: '0px',
        left: '83px',
      },
    },
    path: 'M1.66258 -22.9187C0.462582 -29.7187 1.16258 -42.752 1.66258 -48.4187C2.32974 -48.752 7.50359 -48.4626 20 -47.4187C37.5 -45.9568 36.5 -54.4568 34.1641 -62.9187C32.6765 -68.3073 32 -84.9568 48 -83.9568C64.1626 -82.9467 61.5 -64.9568 59.5 -59.4568C57.5 -53.9568 59.5 -48.4187 65.5 -47.4187C70.3 -46.6187 84.9974 -47.4187 91.6641 -47.4187C91.9974 -43.9187 93 -32.495 93 -23.9568C93 -12.9455 85 -12.5 78 -15.5C71 -18.5 59.5 -13.4187 59.5 -0.418686C59.5 12.5813 67.5 17 77 16C86.5 15 90.1641 16 91.6641 23.5C92.8641 29.5 93 43.6667 92.5 50.5C92.5 50.5 68 46.6 62 53C56 59.4 65 66.5432 61 79.0432C57 91.5432 40.4351 90.865 35.5 81.5432C29.1471 69.5432 40.66 60.0432 33.1641 53.5813C28.2789 49.37 11 51.5 2.5 51.5C2.16617 43.5 1.66258 27.2813 1.66258 22.0813C1.66258 15.5813 7.66406 15.5813 16.1641 17.0813C24.6641 18.5813 33.6641 10.0813 33.1641 -0.418686C32.6641 -10.9187 24.6641 -16.4187 16.1641 -14.9187C7.66406 -13.4187 3.16258 -14.4187 1.66258 -22.9187Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 119,
      height: 53,
      style: {
        top: '0px',
        right: '0px',
      },
    },
    path: 'M34 24C35.2 30 34.5 43.6667 34 50.5C42 50.5 55.5 52.7 61.5 51.5C69 50 71.5 46.5 68 34.5C65.6532 26.4537 68 14.5 81 14.5C94 14.5 97 29 94 38C91 47 93.5 51 103 51.5C110.6 51.9 121.333 51.6667 125.5 51.5C125.5 48.5 124.5 30 124.5 22.5C124.5 15.4822 128.5 15 138.5 17C147.969 18.8938 158 10.5 156.5 -2.5C155.346 -12.5 148.5 -20 135 -17C121.5 -14 124.167 -37.1667 125.5 -49.5C119 -51 108.4 -52 104 -52C98.5 -52 90.7772 -49.5992 94.5 -37.5C98.5 -24.5 93.5 -15 82.5 -14C71.5 -13 65 -23.5 68.5 -36.5C72 -49.5 64.5 -51 55 -51C47.4 -51 39.5 -50 36.5 -49.5C36.8333 -46 36.1 -35.3 36.5 -26.5C37 -15.5 30 -14 23 -17C16 -20 0.5 -15.5 0.5 -2.5C0.5 10.5 9.5 18 19 17C28.5 16 32.5 16.5 34 24Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 88,
      height: 175,
      style: {
        top: '14px',
        left: '0px',
      },
    },
    path: 'M-4.33742 62.0813C-5.53742 55.2813 -4.83742 42.248 -4.33742 36.5813C-3.67026 36.248 1.50359 36.5374 14 37.5813C31.5 39.0432 30.5 30.5432 28.1641 22.0813C26.6765 16.6927 26 0.0431709 42 1.04318C58.1626 2.05334 55.5 20.0432 53.5 25.5432C51.5 31.0432 53.5 36.5813 59.5 37.5813C64.3 38.3813 78.9974 37.5813 85.6641 37.5813C85.9974 41.0813 87 52.505 87 61.0432C87 72.0545 79 72.5 72 69.5C65 66.5 53.5 71.5813 53.5 84.5813C53.5 97.5813 61.5 102 71 101C80.5 100 84.1641 101 85.6641 108.5C86.8641 114.5 86.1641 129.667 85.6641 136.5C79 136.5 61 132.181 55 138.581C49 144.981 59 151.543 55 164.043C51 176.543 32.9351 176.322 28 167C21.6471 155 33.496 145.043 26 138.581C21.1148 134.37 4.49592 136.581 -4.33742 138.581C-4.67124 130.581 -4.33742 112.281 -4.33742 107.081C-4.33742 100.581 1.66406 100.581 10.1641 102.081C18.6641 103.581 27.6641 95.0813 27.1641 84.5813C26.6641 74.0813 18.6641 68.5813 10.1641 70.0813C1.66406 71.5813 -2.83742 70.5813 -4.33742 62.0813Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 155,
      height: 104,
      style: {
        top: '49px',
        left: '53px',
      },
    },
    path: 'M32.5 74C33.7 80 33 95.1667 32.5 102C39.5 102.5 55 103.2 61 102C68.5 100.5 67 93.5 64.5 85.5C62 77.5 65.5 66 78.5 66C91.5 66 93 80 90 89C87 98 91.5 102.5 101 103C108.6 103.4 118.833 103.167 123 103V74C123 66.9822 126 65 136 67C145.469 68.8938 155.5 62 154 49C152.5 36 144.5 33.5 131.5 35.5C118.5 37.5 122 15 122.5 1.5C117 1 107.9 0.5 103.5 0.5C98 0.5 86.2772 2.9008 90 15C94 28 89.5 38 78.5 39C67.5 40 61 29.5 64.5 16.5C68 3.5 60.5 2 51 2H32.5C32.8333 5.5 33.6 16.2 34 25C34.5 36 27.5 37.5 20.5 34.5C13.5 31.5 0.5 36 0.5 49C0.5 62 9 67 18.5 66C28 65 31 66.5 32.5 74Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 86,
      height: 175,
      style: {
        top: '14px',
        right: '0px',
      },
    },
    path: 'M1.66258 63.0812C0.462582 56.2812 1.16258 43.2478 1.66258 37.5812C2.32974 37.2478 7.50359 37.5373 20 38.5812C37.5 40.0431 36.5 31.5431 34.1641 23.0812C32.6765 17.6926 32.5 0.499873 48.5 1.49988C64.6626 2.51005 63.5 18.9999 61.5 24.4999C59.5 29.9999 60 36.5812 66 37.5812C70.8 38.3812 84.9974 38.5812 91.6641 38.5812C91.9974 42.0812 93 53.5049 93 62.043C93 73.0544 85 73.4999 78 70.4999C71 67.4999 59.5 72.5812 59.5 85.5812C59.5 98.5812 67.5 103 77 102C86.5 101 90.1641 102 91.6641 109.5C92.8641 115.5 92.1641 130.667 91.6641 137.5C85 137.5 67 133.181 61 139.581C55 145.981 65 152.543 61 165.043C57 177.543 40.4351 176.865 35.5 167.543C29.1471 155.543 40.66 146.043 33.1641 139.581C28.2789 135.37 11.4974 136.581 2.66406 138.581C2.33024 130.581 1.66258 113.281 1.66258 108.081C1.66258 101.581 7.66406 101.581 16.1641 103.081C24.6641 104.581 33.6641 96.0812 33.1641 85.5812C32.6641 75.0812 24.6641 69.5812 16.1641 71.0812C7.66406 72.5812 3.16258 71.5812 1.66258 63.0812Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 119,
      height: 105,
      style: {
        top: '148px',
        left: '0px',
      },
    },
    path: 'M-4 74.5C-2.8 80.5 -3.5 95.6667 -4 102.5C3 103 18.5 103.7 24.5 102.5C32 101 30.5 94 28 86C25.5 78 29 66.5 42 66.5C55 66.5 56.5 80.5 53.5 89.5C50.5 98.5 55 103 64.5 103.5C72.1 103.9 82.3333 103.667 86.5 103.5V74.5C86.5 67.4822 89.5 65.5 99.5 67.5C108.969 69.3938 119 62.5 117.5 49.5C116.288 39 109.5 33.5 96 36.5C82.5 39.5 85.1667 14.8333 86.5 2.5C81 2 68.9 1 64.5 1C59 1 49.7772 3.4008 53.5 15.5C57.5 28.5 53 38.5 42 39.5C31 40.5 24.5 30 28 17C31.5 4 24 2.5 14.5 2.5C6.9 2.5 -1 3.5 -4 4C-3.66667 7.5 -2.9 16.7 -2.5 25.5C-2 36.5 -9 38 -16 35C-23 32 -36 36.5 -36 49.5C-36 62.5 -27.5 67.5 -18 66.5C-8.5 65.5 -5.5 67 -4 74.5Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 94,
      height: 174,
      style: {
        top: '114px',
        left: '84px',
      },
    },
    path: 'M1.66258 62.0813C0.462582 55.2813 1.16258 42.248 1.66258 36.5813C2.32974 36.248 7.50359 36.5374 20 37.5813C37.5 39.0432 36.7938 30.637 33.5 22.5C30.8359 15.9187 32 0.043191 48 1.0432C64.1626 2.05336 61.5 20.0432 59.5 25.5432C57.5 31.0432 59 34.9187 66 37C70.6644 38.3869 84.9974 37.5813 91.6641 37.5813C91.9974 41.0813 93 52.505 93 61.0432C93 72.0545 85 72.5 78 69.5C71 66.5 59.5 71.5813 59.5 84.5813C59.5 97.5813 67.5 102 77 101C86.5 100 90.1641 101 91.6641 108.5C92.8641 114.5 92.1641 129.667 91.6641 136.5C85 136.5 67 132.181 61 138.581C55 144.981 65 151.543 61 164.043C57 176.543 40.4351 175.865 35.5 166.543C29.1471 154.543 40.66 145.043 33.1641 138.581C28.2789 134.37 11.4974 135.581 2.66406 137.581C2.33024 129.581 1.66258 112.281 1.66258 107.081C1.66258 100.581 7.66406 100.581 16.1641 102.081C24.6641 103.581 33.6641 95.0813 33.1641 84.5813C32.6641 74.0813 24.6641 68.5813 16.1641 70.0813C7.66406 71.5813 3.16258 70.5813 1.66258 62.0813Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 117,
      height: 105,
      style: {
        top: '148px',
        right: '0px',
      },
    },
    path: 'M32.5 74.5C33.7 80.5 33.5 95.6667 33 102.5C40 103 54 104.7 60 103.5C67.5 102 67.5 94 65 86C62.5 78 65.5 67 78.5 67C91.5 67 93.5 81 90.5 90C87.5 99 90.9875 104 101 104C109 104 119.333 103.667 123.5 103.5V74.5C123.5 67.4822 126.5 65.5 136.5 67.5C145.969 69.3938 156 62.5 154.5 49.5C153 36.5 146.5 33.5 133 36.5C119.5 39.5 122.167 14.8333 123.5 2.5C118 2 105.9 1 101.5 1C96 1 87.2772 2.9008 91 15C95 28 91.5 38.5 80.5 39.5C69.5 40.5 61.5096 29.8579 65.5 17C70 2.5 60.5 1.5 51 1.5C43.4 1.5 36 3 33 3.5C33.3333 7 33.6 16.2 34 25C34.5 36 27.5 39 20.5 36C12 32.3571 0.5 37 0.5 50C0.5 63 6 68.3158 18.5 67C28 66 31 67 32.5 74.5Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 88,
      height: 174,
      style: {
        bottom: '12px',
        left: '0px',
      },
    },
    path: 'M-4.33742 62.0813C-5.53742 55.2813 -4.83742 42.248 -4.33742 36.5813C-3.67026 36.248 1.50359 36.5374 14 37.5813C31.5 39.0432 30.5 30.5432 28.1641 22.0813C26.6765 16.6927 26 0.0431709 42 1.04318C58.1626 2.05334 55.5 20.0432 53.5 25.5432C51.5 31.0432 53.5 36.5813 59.5 37.5813C64.3 38.3813 79.8333 38.5 86.5 38.5C86.8333 42 87.5 52.9619 87.5 61.5C87.5 72.5114 80 73 73 70C66 67 54 72.0813 54 85.0813C54 98.0813 61.5 102 71 101C80.5 100 84.1641 101 85.6641 108.5C86.8641 114.5 86.1641 129.667 85.6641 136.5C79 136.5 61 132.181 55 138.581C49 144.981 59 151.543 55 164.043C51 176.543 34.4351 175.865 29.5 166.543C23.1471 154.543 34.66 145.043 27.1641 138.581C22.2789 134.37 5.4974 135.581 -3.33594 137.581C-3.66976 129.581 -4.33742 112.281 -4.33742 107.081C-4.33742 100.581 1.66406 100.581 10.1641 102.081C18.6641 103.581 27.6641 95.0813 27.1641 84.5813C26.6641 74.0813 18.6641 68.5813 10.1641 70.0813C1.66406 71.5813 -2.83742 70.5813 -4.33742 62.0813Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 156,
      height: 105,
      style: {
        bottom: '46px',
        left: '53px',
      },
    },
    path: 'M33 74.5C34.2 80.5 32.5 94.6667 32 101.5C40 101.5 52.5 103.7 58.5 102.5C66 101 67.5 94 65 86C62.5 78 66 66.5 79 66.5C92 66.5 93.5 80.5 90.5 89.5C87.5 98.5 92 103 101.5 103.5C109.1 103.9 119.333 103.667 123.5 103.5C123.5 100.5 122.5 82 122.5 74.5C122.5 67.4822 126.5 65.5 136.5 67.5C145.969 69.3938 156 62.5 154.5 49.5C153.346 39.5 146.5 33.5 133 36.5C119.5 39.5 122.167 14.8333 123.5 2.5C118 2 105.9 1 101.5 1C96 1 86.5 4.5 91 16C95.5695 27.6777 90.034 40.0015 79 39.5C68 39 62 30.5 65.5 17.5C69 4.5 64.5 2.5 51.5 1.5C43.9224 0.917107 36.5 3 33.5 3.5C33.8333 7 34.1 16.7 34.5 25.5C35 36.5 28 38 21 35C14 32 1 36.5 1 49.5C1 62.5 9.5 67.5 19 66.5C28.5 65.5 31.5 67 33 74.5Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 86,
      height: 174,
      style: {
        bottom: '11px',
        right: '0px',
      },
    },
    path: 'M1.66258 62.0813C0.462582 55.2813 1.16258 42.248 1.66258 36.5813C2.32974 36.248 7.50359 36.5374 20 37.5813C37.5 39.0432 36.5 30.5432 34.1641 22.0813C32.6765 16.6927 32 0.0431709 48 1.04318C64.1626 2.05334 61.5 20.0432 59.5 25.5432C57.5 31.0432 59.5 36.5813 65.5 37.5813C70.3 38.3813 84.9974 37.5813 91.6641 37.5813C91.9974 41.0813 93 52.505 93 61.0432C93 72.0545 85 72.5 78 69.5C71 66.5 59.5 71.5813 59.5 84.5813C59.5 97.5813 67.5 102 77 101C86.5 100 90.1641 101 91.6641 108.5C92.8641 114.5 92.1641 129.667 91.6641 136.5C85 136.5 67 132.181 61 138.581C55 144.981 65 151.543 61 164.043C57 176.543 39.0954 175.715 35 166.5C29 153 39.5 144.043 33.1641 138.581C28.2789 134.37 14 136.5 2.5 137.5C2.16617 129.5 1.66258 112.281 1.66258 107.081C1.66258 100.581 8 99.5 16.1641 101.5C24.5475 103.554 33.6641 95.0813 33.1641 84.5813C32.6641 74.0813 24.6641 68.5813 16.1641 70.0813C7.66406 71.5813 3.16258 70.5813 1.66258 62.0813Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 118,
      height: 53,
      style: {
        bottom: '-1px',
        left: '0px',
      },
    },
    path: 'M-5 75.5C-3.8 81.5 -5.5 95.6667 -6 102.5C2 102.5 14.5 104.7 20.5 103.5C28 102 29.5 95 27 87C24.5 79 28 67.5 41 67.5C54 67.5 55.5 81.5 52.5 90.5C49.5 99.5 54 104 63.5 104.5C71.1 104.9 81.3333 104.667 85.5 104.5C85.5 101.5 84.5 83 84.5 75.5C84.5 68.4822 88.5 66.5 98.5 68.5C107.969 70.3939 118 63.5 116.5 50.5C115.346 40.5 108.5 33 95 36C81.5547 38.9879 84.1453 15.0288 85.4837 2.65059L85.5 2.50004C78.5 1 68.5 1 64.5 1C59 1 49.8077 3.38901 54 15.5C58.5 28.5 53.5 38 42.5 39C31.5 40 25 29 28.5 17.5C33.0341 2.60212 24.5 2 15 2C7.4 2 5 2 -3.5 3.50004C-3.16667 7.00004 -3.9 17.7 -3.5 26.5C-3 37.5 -10 39 -17 36C-24 33 -37 37.5 -37 50.5C-37 63.5 -28.5 68.5 -19 67.5C-9.5 66.5 -6.5 68 -5 75.5Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 95,
      height: 87,
      style: {
        bottom: '-1px',
        left: '83px',
      },
    },
    path: 'M1.66258 62.0813C0.462582 55.2813 1.16258 42.248 1.66258 36.5813C2.32974 36.248 7.50359 36.5374 20 37.5813C37.5 39.0432 37.3359 29.9619 35 21.5001C33.5124 16.1114 33.5 0.500007 49.5 1.50001C65.6626 2.51018 62 19.5001 60 25.0001C58 30.5001 59.5 36.5813 65.5 37.5813C70.3 38.3813 83.5 39 93.5 38C93.8333 41.5 94.5 52.4619 94.5 61.0001C94.5 72.0114 87 73.0813 80 70.0813C73 67.0813 61 72.0001 61 85.0001C61 98.0001 67.5 102 77 101C86.5 100 90.1641 101 91.6641 108.5C92.8641 114.5 92.1641 129.667 91.6641 136.5C85 136.5 67 132.181 61 138.581C55 144.981 65 151.543 61 164.043C57 176.543 40.4351 175.865 35.5 166.543C29.1471 154.543 40.66 145.043 33.1641 138.581C28.2789 134.37 11.4974 135.581 2.66406 137.581C2.33024 129.581 1.66258 112.281 1.66258 107.081C1.66258 100.581 7.66406 100.581 16.1641 102.081C24.6641 103.581 33.6641 95.0813 33.1641 84.5813C32.6641 74.0813 24.6641 68.5813 16.1641 70.0813C7.66406 71.5813 3.16258 70.5813 1.66258 62.0813Z',
  },
  {
    component: Slice,
    svgProps: {
      width: 117,
      height: 52,
      style: {
        bottom: '-1px',
        right: '0px',
      },
    },
    path: 'M33 74.5C34.2 80.5 32.5 94.6667 32 101.5C40 101.5 52.5 103.7 58.5 102.5C66 101 67.5 94 65 86C62.5 78 66 66.5 79 66.5C92 66.5 93.5 80.5 90.5 89.5C87.5 98.5 92 103 101.5 103.5C109.1 103.9 119.333 103.667 123.5 103.5C123.5 100.5 122.5 82 122.5 74.5C122.5 67.4822 126.5 65.5 136.5 67.5C145.969 69.3938 156 62.5 154.5 49.5C153.346 39.5 146.5 33.5 133 36.5C119.5 39.5 122.167 14.8333 123.5 2.5C118 2 105.9 1 101.5 1C96 1 86.7772 3.4008 90.5 15.5C94.5 28.5 90 38.5 79 39.5C68 40.5 62 29.5 65.5 16.5C69.2477 2.57986 61.5 2 52 2C44.4 2 36.5 3 33.5 3.5C33.8333 7 34.1 16.7 34.5 25.5C35 36.5 28 38 21 35C14 32 1 36.5 1 49.5C1 62.5 9.5 67.5 19 66.5C28.5 65.5 31.5 67 33 74.5Z',
  },
];