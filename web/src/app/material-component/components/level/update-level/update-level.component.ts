import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Role} from '../../../models/role';
import {ResponseApi} from "../../../../core/models/response-api";
import {ConfigService} from "../../../services/config.service";

@Component({
    selector: 'update-level',
    templateUrl: './update-level.component.html',
    styleUrls: ['./update-level.component.css']
})
export class UpdateLevelComponent {

    colors = [
        {value: 'red', viewValue: 'Red'},
        {value: 'blue', viewValue: 'Blue'},
        {value: 'green', viewValue: 'Green'},
        {value: 'yellow', viewValue: 'Yellow'},
        {value: 'pink', viewValue: 'Pink'},
        {value: 'purple', viewValue: 'Purple'},
        {value: 'orange', viewValue: 'Orange'},
        {value: 'brown', viewValue: 'Brown'},
        {value: 'grey', viewValue: 'Grey'},
        {value: 'black', viewValue: 'Black'},
    ];


    public roleForm: FormGroup = new FormGroup(
        {
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            color: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        }
    );

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _dialogRef: MatDialogRef<UpdateLevelComponent>,
        public router: Router,
        public dialog: MatDialog,
        private _permissionService: ConfigService,
    ) {
    }

    ngOnInit() {
        this.roleForm = new FormGroup(
            {
                id: new FormControl(this.data.role.id, [Validators.required]),
                name: new FormControl(this.data.role.name, [Validators.required]),
                color: new FormControl(this.data.role.color, [Validators.required]),
                description: new FormControl(this.data.role.displayName, [Validators.required])
            }
        );
    }

    createRole = () => {
        const role = this.roleForm.value;
        const id: number = this.data.role.id;
        if (this.roleForm.invalid) {
            return;
        }
        this._permissionService.updateLevel(id, role.displayName).subscribe(
            (response: any) => {
                this._permissionService.openNotify(1, 'Cập nhật thành công');
                this._dialogRef.close(true);
            },
            (error) => {
                this._permissionService.openNotify(-1, 'Can not update role');
            }
        );
    }
}
