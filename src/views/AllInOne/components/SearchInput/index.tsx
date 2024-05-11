import { StyledSearch, StyledSearchIcon, StyledSearchInput } from "@/views/AllInOne/components/SearchInput/styles";

const SearchInput = (props: Props) => {
  const { placeholder, width } = props;

  return (
    <StyledSearch width={width}>
      <StyledSearchIcon>
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#979ABE" stroke-width="2" />
          <rect x="14.9138" y="9.6499" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9138 9.6499)"
                fill="#979ABE" />
        </svg>
      </StyledSearchIcon>
      <StyledSearchInput placeholder={placeholder}></StyledSearchInput>
    </StyledSearch>
  );
};

export default SearchInput;

interface Props {
  placeholder?: string;
  width?: string;
}
