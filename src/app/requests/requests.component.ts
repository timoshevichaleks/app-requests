import { HttpClient } from '@angular/common/http';
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
    if (!this.checkInputs(this.item)) return;

    this.http.post<Item>(this.itemsUrl, this.item).subscribe(
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
