import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";

const CustomFooter= () =>{
    return (
      <GridFooterContainer>
        {/* Add what you want here */}
        <GridFooter sx={{
          border: 'none', // To delete double border.
          }} />
      </GridFooterContainer>
    );
  }
  export default CustomFooter;