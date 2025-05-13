
# Seller Product Manager

A React + TypeScript module for a seller dashboard that allows sellers to manage and view products using data from a public REST API.

## Features Implemented

- **Product Listing View**:
  - Display a table of products with image, title, category, price, and stock
  - Search functionality to filter by product title
  - Category filter with dropdown
  - Sorting options for price, stock, and title
  
- **Add New Product**:
  - Modal form to simulate adding a new product
  - Input fields for title, price, category, stock, and image URL
  - Validation for all input fields
  - On submission, the product is added to the UI list dynamically

## Technical Implementation

- React with TypeScript
- Data fetching from DummyJSON API
- State management using React Context
- Form handling with React Hook Form and Zod validation
- Responsive design with Tailwind CSS
- UI components from shadcn/ui

## Setup Instructions

1. Clone the repository
   ```
   git clone <repository-url>
   cd seller-product-manager
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal)

## Project Structure

- `src/components/`: UI components
- `src/context/`: Context providers for state management
- `src/services/`: API services
- `src/types/`: TypeScript type definitions
- `src/pages/`: Page components

## API Integration

The application fetches product data from [DummyJSON API](https://dummyjson.com/products).

## Responsive Design

The UI is fully responsive and works on desktop, tablet, and mobile devices.
