import { useState, useCallback,useEffect } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  TextField,
  InlineStack,
  Icon,
  ChoiceList,
  Divider,
  Button,
  Checkbox,
  DropZone,
  PageActions,
  Select,
  ColorPicker,
  RangeSlider,
  Badge
  
} from "@shopify/polaris";
import { EyeCheckMarkIcon, QuestionCircleIcon, PlusCircleIcon, CollectionIcon } from '@shopify/polaris-icons';
import { useAppBridge } from '@shopify/app-bridge-react';
import { ResourcePicker } from '@shopify/app-bridge/actions';
export default function Index() {
  const [textFieldValue, setTextFieldValue] = useState("Gift");
  const [selected, setSelected] = useState(["All Products"]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [giftName, setGiftName] = useState("Example Gift");
  const [subtitle, setSubtitle] = useState("100% Natural");
  const [badge, setBadge] = useState("ONLY TODAY");
  const [priceText, setPriceText] = useState("");
  const [discountName, setDiscountName] = useState("Free Gift");

  const [showImage, setShowImage] = useState(true);
  const [strikeThroughPrice, setStrikeThroughPrice] = useState(true);
  const [skipToCheckout, setSkipToCheckout] = useState(false);
  const [limitedPerOrder, setLimitedPerOrder] = useState(false);
  const handleTextFieldChange = useCallback((value) => setTextFieldValue(value), []);
  const handleChoiceListChange = useCallback((value) => setSelected(value), []);
  const fontWeightOptions = [
    { label: "Regular", value: "Regular" },
    { label: "Bold", value: "Bold" },
  ];
  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value);
  }, []);
  
  const [productTitle, setProductTitle] = useState({ size: "16", weight: "Bold", color: "#000000" });
  const [subtitles, setSubtitles] = useState({ size: "15", weight: "Regular", color: "#000000" });
  const [price, setPrice] = useState({ size: "16", weight: "Bold", color: "#000000" });
  const [comparePrice, setComparePrice] = useState({ size: "14", weight: "Regular", color: "#999999" });

  const [badgeColors, setBadgeColors] = useState({
    background: "#FFF1CC",
    text: "#A67C00",
  });

  ///
  const [selectedStyle, setSelectedStyle] = useState('');

  const handleClick = (style) => {
    setSelectedStyle(style === selectedStyle ? '' : style); // Toggle selection
  };

  const badgeStyle = (style) => ({
    cursor: 'pointer',
    backgroundColor: selectedStyle === style ? 'white' : '#f1f1f1', // White when selected
    color: selectedStyle === style ? 'black' : '#000', // Black text for selected
    border: '1px solid #ccc',
    padding: '8px 12px',
    borderRadius: '4px',
    marginRight: '10px',
  });

  //app  brige work
 // App bridge work
 const [app, setApp] = useState(null);
 useEffect(() => {
   // Only access window here (client-side only)
   const params = new URLSearchParams(window.location.search);
   const host = params.get('host');
   const shopOrigin = 'demo-hydrogentheme.myshopify.com';

   if (host && shopOrigin) {
     import('@shopify/app-bridge').then(({ createApp }) => {
       const appInstance = createApp({
         apiKey: '2d45e8ab42260cbb284547fe8f89fd06',
         host,
         shopOrigin,
       });
       setApp(appInstance);
     });
   }
 }, []);
 
 const openResourcePicker = (type) => {
  if (!app) return; // Ensure app is initialized

  const resourcePicker = ResourcePicker.create(app, {
    resourceType: type === 'product' ? ResourcePicker.ResourceType.Product : ResourcePicker.ResourceType.Collection,
    options: {
      selectMultiple: false,  // Ensure only one product or collection can be selected
      showVariants: false,    // Disable variants if not needed
    },
  });

  resourcePicker.subscribe(ResourcePicker.Action.SELECT, (payload) => {
    const selectedItem = payload.selection[0]; // Get the first selected item
    handleSelection(selectedItem);
  });

  resourcePicker.subscribe(ResourcePicker.Action.CANCEL, () => {
    resourcePicker.disconnect();
  });

  resourcePicker.dispatch(ResourcePicker.Action.OPEN);
};

const handleSelection = (selectedItem) => {
  // Assuming you want to store selected product or collection data
  setSelectedItem(selectedItem);  // Update the state with the selected item
};


 useEffect(() => {
  if (selected[0] === "Specific Products") {
    openResourcePicker('product'); // Automatically open the product picker when "Specific Products" is selected
  } else if (selected[0] === "Specific Collections") {
    openResourcePicker('collection'); // Automatically open the collection picker when "Specific Collections" is selected
  }
}, [selected])
//

const [borderWidth, setBorderWidth] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderSpacing, setBorderSpacing] = useState(0);
  const [borderDashOffset, setBorderDashOffset] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const [imageRadius, setImageRadius] = useState(0);

  // Handle changes for each slider independently
  const handleBorderWidthChange = (value) => setBorderWidth(value);
  const handleBorderRadiusChange = (value) => setBorderRadius(value);
  const handleBorderSpacingChange = (value) => setBorderSpacing(value);
  const handleBorderDashOffsetChange = (value) => setBorderDashOffset(value);
  const handleImageSizeChange = (value) => setImageSize(value);
  const handleImageRadiusChange = (value) => setImageRadius(value);
  return (

    <Page>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Text  variant="headingXl" as="h4">Create Design</Text>
       
  <Button  variant="primary">Create</Button>
  
</div>
<Text variant="bodyMd" tone="subdued">Select  product and create Gift</Text>
<div style={{ display: 'flex', gap: '20px' }}>
  {/* Left Form Section */}
  <div style={{ flex: 1 }}>
  <div style={{width:'500px'}}>
     
     <BlockStack gap="500">
       {/* Gift Name */}
       <Card>
         <TextField
           label="Gift Name"
           value={textFieldValue}
           onChange={handleTextFieldChange}
           autoComplete="off"
         />
       </Card>

       {/* Visibility */}
    
       <Card>
 <BlockStack gap="200">
   <div style={{display:'flex', gap:'20px'}}>
   {/* Wrap icon and text in a row container */}
    <div style={ {width:'20px', marginTop:'8px'}}>
     <Icon source={EyeCheckMarkIcon}/>
     </div>
     <BlockStack>
       <Text fontWeight="bold">Visibility</Text>
       <Text tone="subdued">Where should the gift be displayed</Text>
     </BlockStack>
     </div>
   <Divider />
   <ChoiceList
        title="Product or Collection Selection:"
        choices={[
          { label: "All Products", value: "All Products" },
          { label: "Specific Products", value: "Specific Products" },
          { label: "Specific Collections", value: "Specific Collections" },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
 </BlockStack>
</Card>
    <div style={{marginTop:'10px'}}></div>
     </BlockStack>
     <BlockStack gap="400">
       
       {/* Select Gift Section */}
       <Card>
         <BlockStack gap="300">
           <InlineStack align="space-between">
           <div style={{display:'flex', gap:'20px'}}>
   {/* Wrap icon and text in a row container */}
    <div style={ {width:'20px', marginTop:'8px'}}>
     <Icon source={CollectionIcon}/>
     </div>
     <BlockStack>
       <Text fontWeight="bold">Select Gift</Text>
       <Text tone="subdued">The product that  should  be displayed as Gift</Text>
     </BlockStack>
     </div>
   
            
           </InlineStack>
           <Button icon={PlusCircleIcon } variant="primary">Select Gift</Button>
           <DropZone padding="200" background="bg-surface-secondary">
             <div style={{marginTop:'40px'}}>
             <Text alignment="center" tone="subdued">No gift selected yet</Text>
             </div>
           </DropZone>
         </BlockStack>
          {/* Gift Information Fields */}   
         <BlockStack gap="300">
           <InlineStack gap="300">
             <TextField
               label="Gift Name"
               value={giftName}
               onChange={(value) => setGiftName(value)}
             />
             <TextField
               label="Subtitle"
               value={subtitle}
               onChange={(value) => setSubtitle(value)}
             />
           </InlineStack>

           <InlineStack gap="300">
             <TextField
               label="Badge"
               value={badge}
               onChange={(value) => setBadge(value)}
             />
             <TextField
               label="Price Text"
               value={priceText}
               onChange={(value) => setPriceText(value)}
             />
           </InlineStack>
          <div style={{width:"23%"}}>
           <TextField
             label="Discount Name"
             value={discountName}
             onChange={(value) => setDiscountName(value)}
             
           />
          </div> 
          <div style={{display:'flex', gap:'20px'}}>
                 <div style={{ width:"20px"}}>
                 <Icon source={QuestionCircleIcon} tone="base"  />
                 </div>
                 <Text>What is this?</Text>
               </div>
               <Divider/>
         </BlockStack>
          {/* Checkboxes */}
         <BlockStack gap="200">
           <Checkbox
             label="Show Image"
             checked={showImage}
             onChange={(value) => setShowImage(value)}
           />
           <Checkbox
             label="Strike Through Product Compare Price"
             checked={strikeThroughPrice}
             onChange={(value) => setStrikeThroughPrice(value)}
           />
           <Checkbox
             label="Skip to Checkout"
             checked={skipToCheckout}
             onChange={(value) => setSkipToCheckout(value)}
             helpText="Customer skips cart page and goes directly to checkout."
           />
           <Checkbox
             label="Limited per order"
             checked={limitedPerOrder}
             onChange={(value) => setLimitedPerOrder(value)}
             helpText="Limit how many gifts per order."
           />
         </BlockStack>

       </Card>

     </BlockStack> 
     <BlockStack gap="400">

       {/* Product Title */}
       <Card>
         <BlockStack gap="300">
           <Text variant="headingSm">Product Title</Text>
           <InlineStack gap="300">
             <TextField
               label="Text Size"
               value={productTitle.size}
               onChange={(value) => setProductTitle({ ...productTitle, size: value })}
               type="number"
             />
             <div style={{width:'20%'}
             }>
             <Select
               label="Font Weight"
               options={fontWeightOptions}
               value={productTitle.weight}
               onChange={(value) => setProductTitle({ ...productTitle, weight: value })}
             />

            </div>
            <BlockStack gap="100">
               <Text>color</Text>
               <div
                 style={{
                   width: "90px",
                   height: "30px",
                   backgroundColor:'silver',
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
           </InlineStack>

         </BlockStack>
         <Divider/>
         <BlockStack gap="300">
           <Text variant="headingSm">Subtitles</Text>
           <InlineStack gap="300">
             <TextField
               label="Text Size"
               value={subtitles.size}
               onChange={(value) => setSubtitles({ ...subtitles, size: value })}
               type="number"
             />
             <div style={{width:'20%'}
             }>
             <Select
               label="Font Weight"
               options={fontWeightOptions}
               value={subtitle.weight}
               onChange={(value) => setSubtitle({ ...subtitle, weight: value })}
             />
             </div>
             <BlockStack gap="100">
               <Text>color</Text>
               <div
                 style={{
                   width: "90px",
                   height: "30px",
                   backgroundColor:'silver',
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
           </InlineStack>
           <Divider/>
         </BlockStack>
         <BlockStack gap="300">
           <Text variant="headingSm">Price</Text>
           <InlineStack gap="300" >
             <TextField
               label="Text Size"
               value={price.size}
               onChange={(value) => setPrice({ ...price, size: value })}
               type="number"
             />
              <div style={{width:'20%'}
             }>
             <Select
               label="Font Weight"
               options={fontWeightOptions}
               value={price.weight}
               onChange={(value) => setPrice({ ...price, weight: value })}
             />
            </div>
            <BlockStack gap="100">
               <Text>color</Text>
               <div
                 style={{
                   width: "90px",
                   height: "30px",
                   backgroundColor:'silver',
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
           </InlineStack>
          
         </BlockStack>
         <Divider/>
     {/* Compare Price */}

     <BlockStack gap="300">
           <Text variant="headingSm">Compare Price</Text>
           <InlineStack gap="300">
             <TextField
               label="Text Size"
               value={comparePrice.size}
               onChange={(value) => setComparePrice({ ...comparePrice, size: value })}
               type="number"
             />
             <div style={{width:'20%'}
             }>
             <Select
               label="Font Weight"
               options={fontWeightOptions}
               value={comparePrice.weight}
               onChange={(value) => setComparePrice({ ...comparePrice, weight: value })}
             />
             </div>
              <BlockStack gap="100">
               <Text>color</Text>
               <div
                 style={{
                   width: "90px",
                   height: "30px",
                   backgroundColor:'silver',
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
           </InlineStack>
         </BlockStack>
         <Divider/>
         {/* Badge Colors */}
      
         <BlockStack gap="200">
           <Text variant="headingSm">Badge Colors</Text>
           <div style={{display:'flex',gap:'20px'}}>
           
             <BlockStack gap="100">
               <Text>Background</Text>
               <div
                 style={{
                   width: "80px",
                   height: "40px",
                   backgroundColor: badgeColors.background,
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
             <BlockStack gap="100">
               <Text>Text</Text>
               <div
                 style={{
                   width: "80px",
                   height: "40px",
                   backgroundColor: badgeColors.text,
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
              
             </BlockStack>
             </div>
           
         </BlockStack>
         <Divider/>
         {/*Box Setting*/}
         <BlockStack gap="200">
           <Text variant="headingSm">Box Setting</Text>
           <div style={{display:'flex',gap:'20px'}}>
           
             <BlockStack gap="100">
               <Text>Box Color</Text>
               <div
                 style={{
                   width: "80px",
                   height: "40px",
                   backgroundColor: badgeColors.background,
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
             </BlockStack>
             <BlockStack gap="100">
               <Text>Border Color</Text>
               <div
                 style={{
                   width: "80px",
                   height: "40px",
                   backgroundColor: badgeColors.text,
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
              
             </BlockStack>
             <BlockStack gap="100">
               <Text>Box Color Hover</Text>
               <div
                 style={{
                   width: "80px",
                   height: "40px",
                   backgroundColor: badgeColors.text,
                   borderRadius: "8px",
                   border: "1px solid #ccc",
                 }}
               />
              
             </BlockStack>
             </div>
             <div style={{ marginBottom: '20px' }}>
     <Text>Border Style</Text>
     <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
       <Badge onClick={() => handleClick('dashed')} style={badgeStyle('dashed')}>
         Dashed
       </Badge>
       <Badge onClick={() => handleClick('solid')} style={badgeStyle('solid')}>
         Solid
       </Badge>
     </div>
   </div>
         </BlockStack>
         <RangeSlider
        output
        label="Border Width"
        min={-4}
        max={8}
        value={borderWidth}
        onChange={handleBorderWidthChange}
      />
      <RangeSlider
        output
        label="Border Radius"
        min={-5}
        max={11}
        value={borderRadius}
        onChange={handleBorderRadiusChange}
      />
      <RangeSlider
        output
        label="Border Spacing"
        min={-30}
        max={4}
        value={borderSpacing}
        onChange={handleBorderSpacingChange}
      />
      <RangeSlider
        output
        label="Border DashOffset"
        min={-11}
        max={2}
        value={borderDashOffset}
        onChange={handleBorderDashOffsetChange}
      />

      <Divider />

      <Text variant="headingLg" as="h5">
        Image Setting
      </Text>
      <RangeSlider
        output
        label="Image Size"
        min={-10}
        max={5}
        value={imageSize}
        onChange={handleImageSizeChange}
      />
      <RangeSlider
        output
        label="Image Radius"
        min={-10}
        max={10}
        value={imageRadius}
        onChange={handleImageRadiusChange}
      />
       </Card>

        <Button variant="primary">Save </Button>
      

      

     </BlockStack>
     </div>
  </div>

  {/* Right Preview Section */}
  <div style={{ flex: 1.5, maxWidth: '500px' }}>
  <Card>
    <Text variant="headingSm">Preview</Text>
    <div style={{ backgroundColor: 'lightgray', padding: '20px', borderRadius: '8px' }}>
      {selectedItem ? (
        <>
          {/* Smaller Image */}
          <img
            src={'https://cdn.shopify.com/s/files/1/0868/9991/7135/files/1.png?v=1730903332'}
            alt={selectedItem.title || "Product Image"}
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: '8px',
              marginBottom: '16px',
            }}
          />

          {/* Product Name */}
          <Text>Name: {selectedItem.title || "Product Name"}</Text>

          {/* Price */}
          <Text>Price: {selectedItem.variants ? selectedItem.variants[0].price : "N/A"}</Text>

          {/* Add to Cart Button */}
          <Button variant="primary" fullWidth style={{ marginTop: '20px' }}>
            Add to Cart
          </Button>
        </>
      ) : (
        <Text>Choose a product or collection to see the preview</Text>
      )}
    </div>
  </Card>
</div>



      </div>


      
    </Page>
  );
}
     