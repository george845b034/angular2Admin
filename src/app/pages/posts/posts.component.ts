import {Component, OnInit, style, state, animate, transition, trigger} from '@angular/core';
import {PostsService} from "../../service/posts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from "ng2-toasty";
import {Subject, Observable, Subscription} from 'rxjs/Rx';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ViewChild} from "@angular/core/src/metadata/di";
declare var $: any;
import 'bootstrap/dist/js/bootstrap';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1, transform: 'translateX(0)'})),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            state('out', style({opacity: 0, transform: 'translateX(100%)'})),
            transition('in => out', [
                animate('0.5s 0.2s ease-out')
            ]),
            transition('out => in', [
                style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }),
                animate('0.5s 0.2s ease-out')
            ])
        ])
    ]
})
export class PostsComponent implements OnInit {

    postsData = [];
    styleFlyInOutList = 'in';
    styleFlyInOutEdit = 'out';
    isAddEvent = false;
    isEditEvent = false;
    postsForm: FormGroup;
    @ViewChild('modal')
    modal: ModalComponent;
    currentDeleteId = 0;

    constructor(private postsService: PostsService, private formBuilder: FormBuilder,
                private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-right'
    }

    ngOnInit() {

        this.postsService.getPostsList().subscribe((resData)=> {
            this.postsData = resData;
        });


        this.postsForm = this.formBuilder.group({
            id: [''],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]]
        });

    }

    onAddSubmit() {

        if (this.postsForm.value.id == '') {

            this.postsService.addPosts(this.postsForm.value.firstName, this.postsForm.value.lastName).subscribe((resData)=> {
                console.log(resData);
                this.addToast("Success", "add data success", "success");
                this.postsForm.reset();
                this.onBackEvent();
            }, (err) => {
                console.log(err);
            });
        } else {
            console.log("update");

            this.postsService.updatePosts(this.postsForm.value.id, this.postsForm.value.firstName, this.postsForm.value.lastName).subscribe((resData)=> {
                console.log(resData);
                this.addToast("Success", "update data success", "success");
                this.postsForm.reset();
                this.onBackEvent();
            }, (err) => {
                console.log(err);
            });
        }
    }

    onDeleteSubmit() {
        if (this.currentDeleteId > 0) {
            this.postsService.detelePosts(this.currentDeleteId + "").subscribe((resData)=> {
                    this.modal.dismiss();
                    this.addToast("Success", "delete data success", "success");
                },
                (error)=> {
                    console.log(error);
                    this.modal.dismiss();
                    this.addToast("Error", "delete data error", "error");
                });
        }
    }

    onAddEvent() {
        this.styleFlyInOutList = 'out';
        this.isAddEvent = true;
    }

    onEditEvent(inData) {
        this.postsForm.get('firstName').setValue(inData.first_name);
        this.postsForm.get('lastName').setValue(inData.last_name);
        this.postsForm.get('id').setValue(inData.id);
        this.styleFlyInOutList = 'out';
        this.isAddEvent = true;
    }

    onDeleteEvent(inData) {
        this.currentDeleteId = inData.id;
        this.modal.open();
    }

    onBackEvent() {
        this.styleFlyInOutEdit = 'out';
        this.isEditEvent = true;
    }

    listAnimationDone(inEvent) {
        if (this.isAddEvent) {
            this.styleFlyInOutEdit = 'in';
            this.isAddEvent = false;
        }
    }

    editAnimationDone(inEvent) {
        if (this.isEditEvent) {
            this.styleFlyInOutList = 'in';
            this.isEditEvent = false;
        }
    }


    addToast(inTitle: string, inMessage: string, inType: string) {
        let interval = 1000;
        let timeout = 5000;
        let seconds = timeout / 1000;
        let subscription: Subscription;

        let toastOptions: ToastOptions = {
            title: inTitle,
            msg: inMessage,
            showClose: true,
            timeout: timeout,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = inTitle;
                    // Update message of toast
                    toast.msg = inMessage;
                });

            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (inType) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }
    }
}
