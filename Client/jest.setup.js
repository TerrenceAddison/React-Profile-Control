import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
require = require("esm")(module /*, options*/);
configure({ adapter: new Adapter() });
