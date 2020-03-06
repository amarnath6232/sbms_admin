import { Component, OnInit } from '@angular/core';
import { Sites } from 'src/app/share/modal/modal';
import { SiteService } from 'src/app/Services/site.service';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {


  sites: Sites[]; // sitelist
  copysite: Sites; // edit or delete site

  sitename;
  sitealias;


  constructor(private siteService: SiteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSitesList();
    this.subSiteListFromService();
  }

  getSitesList() {
    this.siteService.getSities().subscribe(res => {
      console.log("res", res);
      if (res != null) {
        this.sites = res;
        console.log(this.sites);
      } else {
        this.sites = [];
      }
    });
    this.sites = this.siteService.siteList.value;
  }

  subSiteListFromService() {
    this.siteService.siteList.subscribe(val => {
      if (val.length != 0) {
        this.sites = val;
      } else {
        this.sites = [];
      }
    });
    console.log(this.sites);
  }

  copy_site_from_table(site) {
    this.copysite = site;
    this.siteService.copy_site.next(site);
  }

  deleteSite() {
    this.siteService.deleteSite(this.copysite.id).subscribe(
      (res) => {
        $('#deleteSiteModal').modal('hide');
        this.toastr.success(`${this.copysite.siteName} deleted successfully`, "Success");
      });
  }

}
