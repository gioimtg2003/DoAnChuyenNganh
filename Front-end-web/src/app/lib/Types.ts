export interface User {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
}

export interface Employee extends User {
  Id: string;
  Position: string;
  income?: number | 0;
  Status: string | "Offline";
  CreatedAt: string;
  getDetail?: () => void;
}

export interface OptionsDatagridView {
  gridType: string;
  row?: {
    /**
     * Height of row
     * 14-16-20-24
     */
    height: number;
  };
}

export interface ShopUser extends User {}
