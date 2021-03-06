import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
    const select = (el, all = false) => {
      el = el.trim()
      return document.querySelector(el)
    }
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    let selectHeader = select('#header')
    if (selectHeader) {

      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  }


}
