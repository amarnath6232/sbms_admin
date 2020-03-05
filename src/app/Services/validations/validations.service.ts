import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationsService {

  constructor() { }

  readonly permissions = {
    name: {
      label: 'Permission Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Permission name is required',
      err_msg_minLength: 'Permission name must be atleast 4 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    }
  }

  readonly roles = {
    name: {
      label: 'Role Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Role name is required',
      err_msg_minLength: 'Role name must be atleast 4 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    }
  }

  readonly assetCategory = {
    categoryName: {
      label: 'Asset Category Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Asset category name is required',
      err_msg_minLength: 'Asset category name must be atleast 4 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    }
  }

  readonly userCreation = {
    firstName: {
      label: 'First Name',
      minLength: 2,
      maxLength: 16,
      err_msg_required: "First name is required",
      err_msg_minLength: "First name should be minimum 2 characters",
    },
    lastName: {
      label: 'Last Name',
      minLength: 1,
      maxLength: 16,
      err_msg_required: "Last name is required",
    },
    userName: {
      label: 'User Name',
      minLength: 6,
      maxLength: 32,
      err_msg_required: "User name is required",
      err_msg_minLength: "User name should be minimum 6 characters",
    },
    emailId: {
      label: 'Email',
      minLength: 1,
      maxLength: 64,
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
      err_msg_pattern: "Please enter valid email address",
      err_msg_required: 'Email is required'
    },
    password: {
      label: 'Password',
      minLength: 6,
      maxLength: 31,
      err_msg_required: 'password is required',
      err_msg_minLength: "password should be in between 6 to 32 characters",
    },
    phoneNumber: {
      label: 'Phone Number',
      minLength: 10,
      maxLength: 10,
      err_msg_minLength: "Please enter valid phone number",
      err_msg_required: 'Phone number is required'
    },
    country: {
      label: 'Country',
      err_msg_required: 'Country is required'
    },
    state: {
      label: 'State',
      err_msg_required: 'State is required'
    },
    city: {
      label: 'City',
      err_msg_required: 'City is required'
    },
    role: {
      label: 'Role',
      err_msg_required: 'Role is required'
    }
  }

}
