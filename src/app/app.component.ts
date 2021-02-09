import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'smartBlocksCep'

  query = ''
  result = ''
  precision = 1

  submit() {
    this.http
      .post('http://localhost:8080/api/query', {
        query: this.query,
        precision: this.precision,
      })
      .subscribe((res: any) => {
        console.log(res)
        this.result = res.data
      })
  }

  saveTextAsFile(data, filename) {
    if (!data) {
      console.error('Console.save: No data')
      return
    }

    if (!filename) filename = 'console.json'

    const blob = new Blob([data], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)

    let a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('style', 'display: none')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }

  expFile() {
    this.saveTextAsFile(this.result, 'SmartContract.sol')
  }
}
