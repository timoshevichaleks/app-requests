import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  items!: Item[];
  item: Item = new Item(99, 'Test');
  itemsUrl = '/items';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get<Item[]>(this.itemsUrl).subscribe(
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
