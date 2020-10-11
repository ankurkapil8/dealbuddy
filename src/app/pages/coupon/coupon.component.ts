import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from "../../utils.service";
import { Router } from "@angular/router";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html'
})
export class CouponComponent implements OnInit {


  couponDemo ={
        id: '1',
        imageUrl: "../../../assets/img/product.jpg",
        title: "Easy Buy Today",
        description: "A coupon of success, I shall earn, with strength i thee declare that my loving father bestowed upon me, love and success through hardwork, I shall live to fight the days i win",
        formattedDate: "19/29/2929",
        isBookmarked: true,
        base64ImageBytes: "",
        url: ""
    }

  public demoArray = [ 
    this.couponDemo ,
    this.couponDemo ,
      this.couponDemo ,
      this.couponDemo ,
      this.couponDemo ,
      this.couponDemo ,
      this.couponDemo ,
      this.couponDemo ,
];

  public advertisementImage = '../../assets/img/deals_2.png';

  public filterButtons = [
    {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
    {  'class': 'bordered',  'icon': 'fa-list-ul',  'title': 'All' },
    {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
    // {  'class': '',  'icon': 'fa-bookmark',  'title': 'Saved' }
  ];

 public userInteractionIcons = this.utils.userInteractionIcons;
 
    public pageId = 1;
    public allDeals = [];
    public savedDCoupons = [];
    public stopLoading = false;

    
  constructor(
    public utils: UtilsService,
    private router: Router, 
    private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    this.getAllCoupons( this.pageId, undefined);
  }

  pushToCollection(where, data){

            if( where === this.allDeals  ){

                if(where.length == 0){ this.stopLoading = true; }

                data.map( oneData => {

                    let newDate = this.utils.convertEpochDateToLocalDate( oneData.entryTime );
                    oneData.formattedDate = `${ newDate }`;

                });

                data.map( oneData => where.push(oneData) );

            }else{

                data.map( oneData => where.push(oneData) );

                this.savedDCoupons.map( data =>{

                    this.allDeals.map( oneDeal =>{
                                if(oneDeal.id === data.id ){
                                    document.getElementById(`${oneDeal.id}`).style.color = 'red';
                                    oneDeal.isBookmarked = true;
                                }
                    });

                });

                this.allDeals = [...this.allDeals];

            }

  }


    activeRoute(filterButton){

        if( filterButton.class === 'bordered' ){
            return true;
        }
        
    }

    setBookmarkedCoupons(){

            this.savedDCoupons.map( data =>{

                    this.allDeals.map( oneDeal =>{
                                if(oneDeal.id === data.id ){
                                    oneDeal.isBookmarked = true;
                                }
                    });

            });

    }

    getAllCoupons(page, filterBy){

        this.allDeals = [];

        this.utils.getAllCoupons(page, filterBy).subscribe(
            res =>{
              this.pushToCollection( this.allDeals, res );
              this.getSavedCouponsHere();
            },
            err =>{
              this.utils.openSnackBar('Sorry we could not get the coupons, please try please check your internet connection');
            }
          );
    
    };



    selectThisButton( btn ){
        let btnTitle = btn.title;

        this.filterButtons.map( oneBtn =>{

            if(oneBtn.title === btnTitle){
                oneBtn.class = 'bordered';
                this.filterThisResults(btnTitle);
            }else{
                oneBtn.class = '';
            }

        });

    }

    filterThisResults(by){

        const page = 1;
        let filterBy =  'all';
        let callFiter = false;

        if( by === '4 you'){
            filterBy= 'matchedCoupons';
            callFiter = true;

        }else if( by === 'All'){
            filterBy= undefined;
            callFiter = true;

        }else if( by === 'Local'){

            this.utils.getTheUserLocation();

            this.utils.returnLoggedInOrNot() === false ? callFiter = false : callFiter = true;

            filterBy= 'localCoupons';

        }else if( by === 'Saved'){
            
            filterBy= 'savedCoupons';
            callFiter = true;
        }

        // check and call
        if( callFiter === true ){
            this.callFilteredApi(page,filterBy);
        }

    }

    callFilteredApi(page,filterBy){
        this.getAllCoupons(page, filterBy);
    }


    bookmarkThisFeed(icon,feed){

        if(icon.title === 'bookmark' && feed.isBookmarked == true ){
            feed.isBookmarked = undefined;
            this.sendTheBookmarkDelete(feed.id);
        }
        else  if(icon.title === 'bookmark' && feed.isBookmarked == undefined || feed.isBookmarked == false ){
            this.sendTheBookmarkPost(feed.id);
        }

    }
  

    getSavedCouponsHere(){
        
        if(this.utils.returnLoggedInOrNot() == true ){


                    this.savedDCoupons = [];

                    this.utils.getSavedCoupons().subscribe(
                        res =>{
                            this.pushToCollection( this.savedDCoupons, res);
                        },
                        err =>{
                        }
                    );


        }
      

    }

    sendTheBookmarkDelete(dealId){

        this.utils.deleteACouponBookmark(dealId).subscribe(
            res =>{
                this.getSavedCouponsHere();
            },
            err =>{
                this.utils.openSnackBar('Sorry we unbookmark this deal, please try again');
            }
        );

    }


    sendTheBookmarkPost(dealId){

        this.utils.bookmarkACoupon(dealId).subscribe(
            res =>{
                this.getSavedCouponsHere();
            },
            err =>{                
                this.utils.openSnackBar('Sorry we could not bookmark this deal, please try again');
            }
        );

    }



}
