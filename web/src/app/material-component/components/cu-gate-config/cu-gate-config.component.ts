import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ResponseGetProvincesModel} from "../../models/gate-config/response-get-provinces.model";
import {ResponseGetDistrictsModel} from "../../models/gate-config/response-get-districts.model";
import {ResponseGetWardsModel} from "../../models/gate-config/response-get-wards.model";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {ConfigService} from "../../services/config.service";
import {RequestCreateGateModel} from "../../models/gate-config/request-create-gate.model";
import {ResposeCreateGateModel} from "../../models/gate-config/respose-create-gate.model";
import {ResposeGetGateModel} from "../../models/gate-config/respose-get-gate.model";
import {ResponseApi} from "../../../core/models/response-api";

@Component({
    selector: 'app-cu-gate-config',
    templateUrl: './cu-gate-config.component.html',
    styleUrls: ['./cu-gate-config.component.css']
})
export class CuGateConfigComponent implements OnInit {

    public gateForm: FormGroup = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        code: new FormControl(null, [Validators.required]),
        provinceId: new FormControl('', [Validators.required]),
        districtId: new FormControl('', [Validators.required]),
        wardId: new FormControl('', [Validators.required]),
        latitude: new FormControl(null, [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
        description: new FormControl(),
        nationalLevel: new FormControl(1),
        typeOfShipping: new FormControl(1),
        economicSector: new FormControl(true),
        countryCode: new FormControl('cn'),
        countVehicle: new FormControl(0),
    });


    public nationalLevels: any[] = [
        {
            code: 0,
            name: 'Quốc gia'
        },
        {
            code: 1,
            name: 'Quốc tế'
        },
        {
            code: 2,
            name: 'Quốc Tỉnh'
        },
    ];

    public typeOfShippings: any[] = [
        {
            code: 0,
            name: 'Đường hàng không'
        },
        {
            code: 1,
            name: 'Đường bộ'
        },
        {
            code: 2,
            name: 'Đường Thủy'
        },
        {
            code: 3,
            name: 'Đường sắt'
        },
    ];

    public economicSectors: any[] = [
        {
            code: true,
            name: 'Có'
        },
        {
            code: false,
            name: 'Không'
        }
    ];

    public areas: any[] = [];
    isCreate = true;

    provincesList: ResponseGetProvincesModel[] = [];
    public filterProvinces: Observable<ResponseGetProvincesModel[]> | any;
    public province: any;

    districtsList: ResponseGetDistrictsModel[] = [];
    public filterDistricts: Observable<ResponseGetDistrictsModel[]> | any;
    public district: any;

    wardsList: ResponseGetWardsModel[] = [];
    public filterWards: Observable<ResponseGetWardsModel[]> | any;
    public ward: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<CuGateConfigComponent>,
        private _configService: ConfigService
    ) {
    }

    ngOnInit(): void {
        this.setProvinces();
        this.isCreate = this.data.isCreate;
        if (!this.isCreate) {
            this.setUpdateData(this.data.dataUpdate);
        }
    }

    submit = () => {
        if (this.gateForm.invalid) {
            this._configService.openNotify(1, "Vui lòng kiểm tra lại thông tin cửa khẩu");
            return;
        }

        const requestCreateGate: RequestCreateGateModel = this.gateForm.value;

        if (this.isCreate) {
            this._configService.createGate(requestCreateGate).subscribe(
                (res: ResponseApi<ResposeCreateGateModel>) => {
                    if (1 !== res.result) {
                        this._configService.openNotify(-1, res.message);
                        return;
                    }
                    this._configService.openNotify(-1, "Thêm cửa khẩu thành công");
                    this.dialogRef.close(true);
                }, () => {
                    this._configService.openNotify(-1, "Thêm cửa khẩu thất bại");
                })
        } else {
            this._configService.updateGate(this.data.dataUpdate.id, requestCreateGate).subscribe(
                (res: ResponseApi<ResposeCreateGateModel>) => {
                    if (1 !== res.result) {
                        this._configService.openNotify(-1, res.message);
                        return;
                    }
                    this._configService.openNotify(-1, "Cập nhật cửa khẩu thành công");
                    this.dialogRef.close(true);
                }, () => {
                    this._configService.openNotify(-1, "Cập nhật cửa khẩu thất bại");
                })
        }

    }

    onCitySelectionChange = (event: any) => {
        this.gateForm.controls['provinceId'].setErrors(null);
        const ctgCity = this.provincesList.find(x => x.code === (this.isCreate ? event.option.value : event));
        this.gateForm.controls['provinceId'].setValue(ctgCity?.code);
        this.province = ctgCity;

        // call get districtsList
        this._configService.getDistrictsInfoByProvinceId((this.isCreate ? event.option.value : event)).subscribe(
            (res: ResponseApi<ResponseGetDistrictsModel[]>) => {
                if (1 !== res.result) {
                    this.districtsList = [];
                    return;
                }
                this.districtsList = res.data;
                this.setDistricts();
            }, error => {
                this.districtsList = [];
            }
        )
    }
    displayProvincesTypeFn = (com: any): string => {
        return com != null && typeof com === "object" ? com.name : this.province?.name;
    }

    setProvinces = () => {
        this.provincesList = this.data.provinces;
        this.filterProvinces = this.gateForm.controls.provinceId.valueChanges
            .pipe(
                startWith(''),
                map((cityName: any) => cityName ? this._filterProvincesNameStates(cityName) : this.provincesList.slice())
            );
    }

    private _filterProvincesNameStates = (value: any) => {
        if (typeof (value) != 'object') {
            const filterValue = value.toLowerCase();
            return this.provincesList.filter((province: any) => province?.name?.toLowerCase().includes(filterValue));

        }
        return this.provincesList.filter((province: any) => province?.code === value?.code);
    }

    setDistricts = () => {
        this.filterDistricts = this.gateForm.controls.districtId.valueChanges
            .pipe(
                startWith(''),
                map((districtName: any) => districtName ? this._filterDistrictsNameStates(districtName) : this.districtsList.slice())
            );

        if (!this.isCreate) {
            this.onDistrictSelectionChange(this.data.dataUpdate.districtId);
        }
    }

    private _filterDistrictsNameStates = (value: any) => {
        if (typeof (value) != 'object') {
            const filterValue = value.toLowerCase();
            return this.districtsList.filter((district: any) => district?.name?.toLowerCase().includes(filterValue));

        }
        return this.districtsList.filter((district: any) => district?.code === value?.code);
    }

    onDistrictSelectionChange = (event: any) => {
        this.gateForm.controls['districtId'].setErrors(null);
        const ctgDistrict = this.districtsList.find(x => x.code === (this.isCreate ? event.option.value : event));
        this.gateForm.controls['districtId'].setValue(ctgDistrict?.code);
        this.district = ctgDistrict;

        // call get ward
        this._configService.getWardsInfoByDistrictId((this.isCreate ? event.option.value : event)).subscribe(
            (res: ResponseApi<ResponseGetWardsModel[]>) => {
                if (1 !== res.result) {
                    this.wardsList = [];
                    return;
                }
                this.wardsList = res.data;
                this.setWards();
            }, error => {
                this.wardsList = [];
            }
        )

    }
    displayDistrictsTypeFn = (com: any): string => {
        return com != null && typeof com === "object" ? com.name : this.district?.name;
    }


    setWards = () => {
        this.filterWards = this.gateForm.controls.wardId.valueChanges
            .pipe(
                startWith(''),
                map((wardName: any) => wardName ? this._filterWardsNameStates(wardName) : this.wardsList.slice())
            );

        if (!this.isCreate) {
            this.onWardSelectionChange(this.data.dataUpdate.wardId);
        }
    }

    private _filterWardsNameStates = (value: any) => {
        if (typeof (value) != 'object') {
            const filterValue = value.toLowerCase();
            return this.wardsList.filter((ward: any) => ward?.name?.toLowerCase().includes(filterValue));

        }
        return this.wardsList.filter((ward: any) => ward?.code === value?.code);
    }

    onWardSelectionChange = (event: any) => {
        this.gateForm.controls['wardId'].setErrors(null);
        const ctgWard = this.wardsList.find(x => x.code === (this.isCreate ? event.option.value : event));
        this.gateForm.controls['wardId'].setValue(ctgWard?.code);
        this.ward = ctgWard;
    }
    displayWardsTypeFn = (com: any): string => {
        return com != null && typeof com === "object" ? com.name : this.ward?.name;
    }

    setUpdateData = (data: ResposeGetGateModel) => {
        this.gateForm.controls['name'].setValue(data.name);
        this.gateForm.controls['code'].setValue(data.code);
        this.gateForm.controls['provinceId'].setValue(data.provinceId);
        this.gateForm.controls['districtId'].setValue(data.districtId);
        this.gateForm.controls['wardId'].setValue(data.wardId);
        this.gateForm.controls['longitude'].setValue(data.longitude);
        this.gateForm.controls['latitude'].setValue(data.latitude);
        this.gateForm.controls['description'].setValue(data.description);

        this.onCitySelectionChange(data.provinceId);

    }
}
