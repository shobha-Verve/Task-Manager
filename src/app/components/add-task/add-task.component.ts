import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, input, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule ,MatDateRangePicker} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor, Font, Heading, Bold, Indent, List, TodoList, Base64UploadAdapter,SimpleUploadAdapter,
  Table, TableToolbar, Image, ImageToolbar,ImageInsert, ImageCaption, ImageStyle, ImageResize, LinkImage, ImageResizeEditing, ImageResizeHandles
  , IndentBlock, Alignment, HorizontalLine, HtmlEmbed, SourceEditing, Essentials, Italic, Mention, Code, Paragraph, Undo, Strikethrough, Subscript, Superscript, Underline
} from 'ckeditor5';


// const today = new Date();

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterModule,MatDateRangePicker, FormsModule,CKEditorModule, NgSelectModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatDatepickerModule,],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  providers: [provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
})
export class AddTaskComponent implements OnInit {
  form!: FormGroup;
  selected_file: any = '';
  tasklist: any = [];
  list: any = {}
  fileError: any;
  submitted = false;
  isValidType:any
  isValidSize:any
  userName = [
    { id: 1, name: "Trushal", email: "trushal@verve.com" },
    { id: 2, name: "Surya", email: "surya@verve.com" },
    { id: 3, name: "Manisha", email: "manisha@verve.com" },
    { id: 4, name: "Himanshu", email: "himanshu@verve.com" },
  ]

  taskType = [
    { id: 1, name: 'UI' },
    { id: 2, name: 'Web Development' },
    { id: 3, name: 'Testing Bug' },
    { id: 4, name: 'API testing' },
  ];
  updateTask: any;
  editTask: any = localStorage.getItem("taskEditDetails")
  task_details: any;
  saveTaskDetail: any;
  minEndDate: Date | null = null;
  

  constructor(private router: Router, private el: ElementRef, private toastr: ToastrService) {

    let task = localStorage.getItem('taskDetails')
    if (task) {
      this.tasklist = JSON.parse(task);
    }
    
  }

  ngOnInit(): void {
    this.loadForm();
    this.task_details = JSON.parse(this.editTask)
    if (this.task_details) {
      this.getTaskData();
      this.disabled();
    }
  }
  // ckEditor 
  public Editor = ClassicEditor;
  public config = {
    toolbar: ['undo', 'redo',
      '|', 'bold', 'italic', 
      '|', 'heading', 'sourceEditing',
      '|', 'underline', 'strikethrough', 'subscript', 'superscript', 'code',
      '|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'alignment',
      '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
      '|', 'horizontalLine', 'htmlEmbed', 'insertTable', 'insertImage',
    ],
    shouldNotGroupWhenFull: true,
    sanitize: false,
    script: true,
    allowedContent: true,
    editable: true,
    spellcheck: true,

    plugins: [
      Bold, Essentials, Heading, SourceEditing, Italic, Code, Mention, Paragraph, 
      Undo, Strikethrough, Subscript, Superscript, Underline, HorizontalLine,
      Font, Indent, IndentBlock, Alignment, List, TodoList, HtmlEmbed, 
      Base64UploadAdapter, Table, TableToolbar, Image, ImageInsert, ImageToolbar,SimpleUploadAdapter,
       ImageCaption, ImageStyle, ImageResize, LinkImage, ImageResizeEditing, ImageResizeHandles
    ],
   
   
    image: {
      upload: {
				types: [ 'jpeg', 'png', 'gif', 'bmp', 'svg+xml' ]
			},
      toolbar: [
        'imageStyle:block',
        'imageStyle:side',
        'imageStyle:inline',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'linkImage'
      ],
    },

    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
   

  }

  disabled():void{
    if (this.task_details) {
    this.form.get('taskName')?.disable();
    this.form.get('selectedTaskType')?.disable();
  }
}

  showSuccess() {
    if (this.editTask) {
      this.toastr.success('Updated!', 'Task Updated  successfully!', {
        timeOut: 2000,
      });
    }
    else {
      if(this.form.valid){
        
        this.toastr.success('completed!', 'Task Added  successfully!', {
          timeOut: 2000,
        });
      }
    }
  }

  
  loadForm() {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      selectedTaskType: new FormControl(null, [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      // file:new FormControl(''),
      active: new FormControl(true),
    });

//DatePiker disable the past date from selected date  
    this.form.get('startDate')?.valueChanges.subscribe(startDate =>{
       this.minEndDate = startDate ? new Date(startDate):null
    });
  }

  getTaskData() {
    this.form.controls['userName'].setValue(this.task_details.userName);
    this.form.controls['selectedTaskType'].setValue(this.task_details.selectedTaskType);
    this.form.controls['startDate'].setValue(this.task_details.startDate);
    this.form.controls['endDate'].setValue(this.task_details.endDate);
    // this.form.controls['file'].setValue(this.selected_file);
    // this.selected_file = this.task_details.file,
      this.form.controls['taskName'].setValue(this.task_details.taskName);
      this.form.controls['description'].setValue(this.task_details.description);
    // this.description.setValue(this.task_details.description);
    this.form.controls['active'].setValue(this.task_details.active);
    
  }


  // file upload 
  // onFileChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     // console.log(file);
  //     const allowedTypes = [
  //       'image/jpeg',
  //       'image/png',
  //       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  //       'application/msword', // DOC
  //       'application/pdf'
  //     ];
  //     const maxFileSize = 5 * 1024 * 1024; // 5 MB
  //     this.isValidType = allowedTypes.indexOf(file.type) !== -1;
  //     this.isValidSize = file.size <= maxFileSize;

  //     const extension = file.type;
  //     // console.log(extension);
  //     // console.log(['jpeg', 'png'].indexOf(extension ?? ''));

  //     if (this.isValidType && this.isValidSize) {
  //       this.selected_file = file;
  //       this.isValidType = "";
  //       this.isValidSize=''
  //       console.log(this.selected_file);
        
  //     }
  //     else {
  //       input.value = ''; 

  //       if (!this.isValidType) {
  //         this.fileError = 'Invalid file type. Only JPEG, PNG, DOC, DOCX, and PDF files are allowed.';
  //       } 
  //       else if (!this.isValidSize) {
  //         this.fileError = 'File size exceeds the maximum allowed size of 5 MB.';
  //       }

  //       this.selected_file = null;
  //       console.log(this.selected_file);
  //     }
  //   }
  // }


  

removeFile() {
  this.selected_file = null
}


//  Form error Control Message on hitting submit button 
controlHasError(validation: any, controlName: any): boolean {
  const control = this.form.controls[controlName];
  return control.hasError(validation) && (control.dirty || control.touched);
}
  public findInvalidControls() {
  const invalid = [];
  const controls = this.form.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalid.push(name);
    }
  }
  console.log(invalid);

  return invalid;
}


// submit form 
submit() { 
  // console.log(this.form.value.file);
  if (this.form.invalid) {
    this.findInvalidControls()
    const controls = this.form.controls;
    Object.keys(controls).forEach((controlName, i) => {
      if (i == 0) {
      }
      controls[controlName].markAsTouched();
    });
    this.submitted = true;
    this.toastr.error('Error! Field Required')
    return;
  } else {

    this.submitted = false;
    if (this.task_details) {
      // console.log("Edit Data");
      this.tasklist.forEach((element: any) => {
        // console.log(element.selected_file);          
        if (this.task_details.id == element.id) {
          element.userName = this.form.value.userName,
            element.selectedTaskType = this.form.value.selectedTaskType,
            element.startDate = this.form.value.startDate,
            element.endDate = this.form.value.endDate,
            element.taskName = this.form.value.taskName,
            element.description = this.form.value.description,
            // element.file = this.form.value.file,
            element.active = this.form.value.active
        }
        // console.log(this.selected_file);          
      });

    } else {
      var obj: any =
      {
        userName: this.form.value.userName,
        selectedTaskType: this.form.value.selectedTaskType,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        taskName: this.form.value.taskName,
        description: this.form.value.description,
        // file: this.form.value.file,
        active: this.form.value.active
      }
      // console.log(this.form.value.file);
      this.tasklist.push(obj);
      this.tasklist = this.tasklist.map((obj: any, index: any) => ({
        id: index + 1,
        ...obj
      }));
    }

    localStorage.setItem("taskDetails", JSON.stringify(this.tasklist))
    // console.log(this.tasklist);
    this.router.navigate(['/task-list'])
  }
}

}


