import { ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { ListItem, InfoItem, ListItemsService } from '../list-items.service';

@Component({
  selector: 'app-list-item-form',
  templateUrl: './list-item-form.component.html',
  styleUrls: ['./list-item-form.component.css']
})
export class ListItemFormComponent {
  public formError: string = '';

  @ViewChild('form')
  public formElement: any;

  @ViewChild('file')
  public fileElement: any;

  public informationTypes: {value: string, text: string}[] = [
    {value: 'website', text: 'Website'},
    {value: 'twitter', text: 'Twitter Handle'},
    {value: 'company', text: 'Company'}
  ];

  private _data: ListItem;

  @Output('submit')
  public submitEmitter = new EventEmitter();

  constructor(public listItems: ListItemsService) {
    this._resetData();
  }

  private _resetData() {
    this._data = {
      name: '',
      slug: '',
      blurb: '',
      information: []
    };
    this.addNewInformationRecord('twitter');
  }

  addNewInformationRecord(type: string = '') {
    const information = this._data.information;
    if (!containsEmptyRecords(information)) {
      this._data.information.push(
        {type, value: ''}
      );
    }
  }

  get data() {
    return this._data;
  }

  set data(value: any) {
    if (value) {
      this._data = value as ListItem;
    } else {
      this._resetData();
    }
  }

  checkFormValidity() {
    return this.formElement.nativeElement.checkValidity();
  }

  submit(data) {
    if (!this.checkFormValidity()) {
      this.formError = 'Please be sure to set a value for each form input';
      return;
    }

    data = normalizeFormData(data);
    if (!this.listItems.isUniqueSlug(data.slug)) {
      this.formError = `The name ${data.name} has already been registered`;
      return;
    }

    this.formError = '';

    const reader = new FileReader();
    reader.onload = (e: any) => {
      data['photo_base64'] = e.target.result;
      this.submitEmitter.emit(data);
    };

    const file = this.fileElement.nativeElement.files[0];
    reader.readAsDataURL(file);
  }
}

function containsEmptyRecords(records: InfoItem[]) {
  for (let i = 0; i < records.length; i++) {
    if (isEmptyRecord(records[i])) {
      return true;
    }
  }
  return false;
}

function isEmptyRecord(record: InfoItem) {
  return record.type.length === 0 || record.value.length === 0;
}

function normalizeFormData(data: ListItem) {
  data.information = data.information.filter(item => !isEmptyRecord(item));
  data.slug = prepareSlug(data.name);
  return data;
}

function prepareSlug(name: string) {
  return name.trim().toLowerCase().replace(/\W+/, '-');
}
