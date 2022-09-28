export class SearchCondition {
  code?: string;
  name?: string;
  status?: boolean;
  licencePlate?: string;
  driverPhone?: string;
  ordernamedesc?: boolean;
  gateId?: string;
  isPaging: boolean;
  pageNumber?: number
  pageSize?: number;
  constructor(
    isPaging = false
  ) {
    this.isPaging = isPaging;
  }
}
