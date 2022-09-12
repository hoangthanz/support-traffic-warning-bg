export class RequestCreateStationModel {
  id?: number;
	name?: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
	latitude?: string;
	longitude?: string;
	description?: string;
	gateId?: number;
  status: boolean = true;
}
