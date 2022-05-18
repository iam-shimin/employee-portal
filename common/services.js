// @ts-check
const key = "employees";

/**
 * @typedef Employee
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} role
 * @property {string} dob
 * @property {string} password
 */

/**
 *
 * @returns {Promise<Employee[]>}
 */
async function findAll() {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return [];
  }
}

/**
 *
 * @param {Omit<Employee, 'id' | 'role'>} employee
 */
async function addEmployee(employee) {
  if (!employee || !employee.username || !employee.password)
    throw new Error("Bad Request!");

  const id = Date.now();
  const employeeObject = { ...employee, id, role: "User" };
  const employees = await findAll();

  const match = employees.find(
    (emp) => emp.email === employee.email || emp.username === employee.username
  );
  if (match)
    throw new Error(
      match.email === employee.email
        ? "Email Already Exist!"
        : "Username Already Exist!"
    );

  employees.push(employeeObject);
  localStorage.setItem(key, JSON.stringify(employees));

  return employeeObject;
}

/**
 *
 * @param {Partial<Employee>} criteria
 */
async function findBy(criteria) {
  const employees = await findAll();
  const criteriaKeys = criteria ? Object.keys(criteria) : [];
  if (!criteriaKeys.length) throw new Error("Criteria is required!");

  return employees.find((emp) =>
    criteriaKeys.every((cKey) => criteria[cKey] === emp[cKey])
  );
}

if (!localStorage.getItem(key)) {
  /** @type {Employee[]} */
  const seed = [
    {
      username: "admin",
      dob: "",
      email: "",
      id: 0,
      password: "",
      role: "Super Admin",
    },
  ];
  localStorage.setItem(key, JSON.stringify(seed));
}

export default {
  findAll,
  findBy,
  addEmployee,
};
