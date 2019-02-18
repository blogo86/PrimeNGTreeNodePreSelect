import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/commons/model/user';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  files: TreeNode[];
  selectedFiles: TreeNode[] = [];
  dataArray: string[] = [];

  constructor() { }

  ngOnInit() {  
    this.files = [{
        label:"Documents",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
        children:
        [
            {
                label: "Work",
                expandedIcon: "pi pi-folder-open",
                collapsedIcon: "pi pi-folder",
                children: [
                  {label: "Expenses.doc", icon: "pi pi-file"}, 
                  {label: "Resume.doc", icon: "pi pi-file"}
              ]
            }
        ]
    }];

    this.dataArray = ["Expenses.doc"];
    this.checkNode(this.files, this.dataArray);
  }

  checkNode(nodes:TreeNode[], str:string[]) {
    nodes.forEach(node => {
      //check parent      
      if(str.includes(node.label)) {
        this.selectedFiles.push(node);
      }

      if(node.children != undefined){
        node.children.forEach(child => {
          //check child if the parent is not selected
          if(str.includes(child.label) && !str.includes(node.label)) {
            node.partialSelected = true;
            child.parent = node;
          }

          //check the child if the parent is selected
          //push the parent in str to new iteration and mark all the childs
          if(str.includes(node.label)){
            child.parent = node;
            str.push(child.label);
          }
        });
      }else{
        return;
      }

      this.checkNode(node.children, str);

      node.children.forEach(child => {
        if(child.partialSelected) {
          node.partialSelected = true;
        }
      });
    });
  }
}
