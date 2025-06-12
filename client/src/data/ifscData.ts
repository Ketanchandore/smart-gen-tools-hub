
export interface BankBranch {
  ifsc: string;
  bank: string;
  branch: string;
  address: string;
  contact: string;
  city: string;
  district: string;
  state: string;
  micr?: string;
}

export const banksList = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "Bank of Maharashtra",
  "Punjab & Sind Bank",
  "Kotak Mahindra Bank",
  "Yes Bank",
  "IndusInd Bank",
  "Federal Bank",
  "South Indian Bank",
  "Karur Vysya Bank",
  "Tamilnad Mercantile Bank",
  "City Union Bank",
  "Dhanlaxmi Bank",
  "RBL Bank",
  "IDFC First Bank",
  "Bandhan Bank",
  "AU Small Finance Bank",
  "Equitas Small Finance Bank",
  "Ujjivan Small Finance Bank"
];

export const statesList = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Puducherry", "Andaman and Nicobar Islands"
];

// Sample comprehensive IFSC database (in real app, this would be much larger)
export const ifscDatabase: BankBranch[] = [
  {
    ifsc: "SBIN0000001",
    bank: "State Bank of India",
    branch: "New Delhi Main Branch",
    address: "11, Sansad Marg, New Delhi - 110001",
    contact: "011-23745000",
    city: "New Delhi",
    district: "New Delhi",
    state: "Delhi",
    micr: "110002001"
  },
  {
    ifsc: "HDFC0000001",
    bank: "HDFC Bank",
    branch: "Mumbai Main Branch",
    address: "HDFC Bank House, Senapati Bapat Marg, Lower Parel, Mumbai - 400013",
    contact: "022-39720000",
    city: "Mumbai",
    district: "Mumbai",
    state: "Maharashtra",
    micr: "400240001"
  },
  {
    ifsc: "ICIC0000001",
    bank: "ICICI Bank",
    branch: "Mumbai Main Branch",
    address: "ICICI Bank Towers, Bandra Kurla Complex, Mumbai - 400051",
    contact: "022-26531414",
    city: "Mumbai",
    district: "Mumbai",
    state: "Maharashtra",
    micr: "400229001"
  },
  {
    ifsc: "UTIB0000001",
    bank: "Axis Bank",
    branch: "Mumbai Main Branch",
    address: "Axis House, C-2, Wadia International Centre, Pandurang Budhkar Marg, Mumbai - 400025",
    contact: "022-24251234",
    city: "Mumbai",
    district: "Mumbai",
    state: "Maharashtra",
    micr: "400211001"
  },
  {
    ifsc: "PUNB0000001",
    bank: "Punjab National Bank",
    branch: "New Delhi Main Branch",
    address: "7, Bhikaji Cama Place, New Delhi - 110066",
    contact: "011-26182000",
    city: "New Delhi",
    district: "New Delhi",
    state: "Delhi",
    micr: "110024001"
  },
  // Add more sample data for different states and cities
  {
    ifsc: "BARB0000001",
    bank: "Bank of Baroda",
    branch: "Vadodara Main Branch",
    address: "Mandvi, Vadodara - 390001",
    contact: "0265-2230400",
    city: "Vadodara",
    district: "Vadodara",
    state: "Gujarat",
    micr: "390012001"
  },
  {
    ifsc: "CNRB0000001",
    bank: "Canara Bank",
    branch: "Bangalore Main Branch",
    address: "112, J.C. Road, Bangalore - 560002",
    contact: "080-25588888",
    city: "Bangalore",
    district: "Bangalore Urban",
    state: "Karnataka",
    micr: "560018001"
  }
];

export const generateIFSC = (bankCode: string, branchCode: string): string => {
  return `${bankCode}0${branchCode.padStart(6, '0')}`;
};

export const searchIFSC = (query: {
  bank?: string;
  state?: string;
  district?: string;
  city?: string;
  branch?: string;
  ifsc?: string;
}): BankBranch[] => {
  return ifscDatabase.filter(entry => {
    if (query.ifsc && !entry.ifsc.toLowerCase().includes(query.ifsc.toLowerCase())) return false;
    if (query.bank && !entry.bank.toLowerCase().includes(query.bank.toLowerCase())) return false;
    if (query.state && !entry.state.toLowerCase().includes(query.state.toLowerCase())) return false;
    if (query.district && !entry.district.toLowerCase().includes(query.district.toLowerCase())) return false;
    if (query.city && !entry.city.toLowerCase().includes(query.city.toLowerCase())) return false;
    if (query.branch && !entry.branch.toLowerCase().includes(query.branch.toLowerCase())) return false;
    return true;
  });
};
