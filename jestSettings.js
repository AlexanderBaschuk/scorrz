import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from "enzyme";
import serializer from "@emotion/jest";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
