function Student(first_name, last_name) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.courses = [];
}

Student.prototype.enroll = function (course) {
  this.courses.push(course);
  course.students.push(`${this.first_name} ${this.last_name}`);
};

Student.prototype.courseLoad = function () {
  let load = new Map();
  this.courses.myEach(function (course) {
    if (!load[course.department]) {
      load[course.department] = course.credits;
    } else {
      load[course.department] += course.credits;
    }
  });
  return load;
};

function Course(name, department, credits) {
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.students = [];
}

Course.prototype.addStudent = function (student) {
  student.enroll(this);
};

esteban = new Student("esteban", "ramirez");
math = new Course("calc", "Mathematics", 5);
poetry = new Course("poetry", "English", 3);
esteban.enroll(math);
