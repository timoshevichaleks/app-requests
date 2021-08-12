import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  items!: Item[];
  item: Item = new Item(0, null);
  itemsUrl = '/items';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const url = this.itemsUrl;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (this.item.id) {
      params = params.set('id', `${this.item.id}`) // /items?id=12
    }

    if (this.item.name) {
      params = params.set('name', `${this.item.name}`) // &name=Narco
    }

    const options = { headers, params };

    this.http.get<Item[]>(url, options).subscribe(
      res => this.items = res,
      err => console.log(err.statusText)
      )
  }

  postData() {
    const url = this.itemsUrl;
    const data = this.item;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers};

    if (!this.checkInputs(this.item)) return;

    this.http.post<Item>(url, data, options).subscribe(
      res => this.items.push(res),
      err => console.log(err.statusText)
    )
  }

  private checkInputs({id, name}: any) {
    if (!id || !name) {
      alert('Поля ID или NAME не заполнены');
      return false;
    }

    if (id <= this.items[this.items.length - 1].id) {
      alert('Введенный ID уже существует');
      return false;
    }
    return true;
  }

  clearAndGet() {
    this.items.length = 0;
    this.getData();
  }

}
